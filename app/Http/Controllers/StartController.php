<?php

namespace App\Http\Controllers;

use App\Events\SomeEvent;
use GuzzleHttp\Exception\BadResponseException;
use Illuminate\Http\Request;
use GuzzleHttp\Client;
use App\Http\Requests;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;

class StartController extends Controller
{
    protected $client;

    public function __construct()
    {
        $this->client = new Client([
            'timeout' => 2.0
        ]);
    }

    public function start()
    {
        return view('welcome');
    }

    public function getInitialData()
    {
        $games = collect($this->getOpenGames());
        $users = collect($this->getUsers());
        $events = collect($this->getEvents());

        $response = collect([
            "games" => $games,
            "events" => $events
        ]);

        $detailedUsers = collect();

        foreach ($users as $user) {
            $detailedUsers->push($this->getUserDetails($user));
        }

        $response->put('users', $detailedUsers);

        Cache::put('initialdata', $response, 1);

        return $response;
    }

    private function getUserDetails($userId)
    {
        $baseUserServiceURL = Cache::get('KRATOSUserService');
        $client = new Client([
            'base_uri' => $baseUserServiceURL
        ]);

        $req = $client->request('GET', $userId);
        $response = \GuzzleHttp\json_decode($req->getBody()->getContents(), true);

        return $response;
    }

    private function getOpenGames()
    {
        return $this->getDataForService('KRATOSGameService');
    }

    private function getUsers()
    {
        return $this->getDataForService('KRATOSUserService');
    }

    private function getEvents()
    {
        return $this->getDataForService('KRATOSEventService');
    }

    private function getDataForService($service)
    {
        $uri = Cache::get($service);

        $res = $this->client->request('GET', $uri, [
            'headers' => [
                'Content-Type' => 'application/json'
            ]
        ]);

        if ($res->getStatusCode() === 200) {
            return json_decode($res->getBody()->getContents(), true);
        }

        throw new BadResponseException('Could not connect to server', $res);
    }

}
