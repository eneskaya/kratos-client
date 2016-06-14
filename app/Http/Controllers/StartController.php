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
        $this->client = new Client();
    }

    public function start()
    {
        return view('welcome');
    }

    public function getInitialData()
    {
        if (Cache::has("initialdata")) {
            return Cache::get("initialdata");
        }

        $games = collect($this->getOpenGames());
        $users = collect($this->getUsers());
        $events = collect($this->getEvents());

        $response = collect([
            "games" => $games,
            "users" => $users,
            "events" => $events
        ]);

        Cache::put("initialdata", $response, 60);

        return $response;
    }

    public function getOpenGames()
    {
        $uri = Cache::get('KRATOSGameService');
        $res = $this->client->request('GET', $uri, [
            'headers' => [
                'Content-Type' => 'application/json'
            ]
        ]);

        if ($res->getStatusCode() == 200) {
            return json_decode($res->getBody()->getContents(), true);
        }

        throw new BadResponseException('Could not connect to server', $res);
    }

    public function getUsers()
    {
        $uri = Cache::get('KRATOSUserService');
        $res = $this->client->request('GET', $uri, [
            'headers' => [
                'Content-Type' => 'application/json'
            ]
        ]);

        if ($res->getStatusCode() == 200) {
            return json_decode($res->getBody()->getContents(), true);
        }

        throw new BadResponseException('Could not connect to server', $res);
    }

    public function getEvents()
    {
        $uri = Cache::get('KRATOSEventService');
        $res = $this->client->request('GET', $uri, [
            'headers' => [
                'Content-Type' => 'application/json'
            ]
        ]);

        if ($res->getStatusCode() == 200) {
            return json_decode($res->getBody()->getContents(), true);
        }

        throw new BadResponseException('Could not connect to server', $res);
    }

}
