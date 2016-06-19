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
        
        return [
            'games' => [
              '/games/testspielxy02'
            ],
            'users' => [
                '/users/finn',
                '/users/enes',
                '/users/jakob',
                '/users/niko'
            ]
        ];
        
        $games = collect($this->getOpenGames());
        $users = collect($this->getUsers());
        $events = collect($this->getEvents());

        $response = collect([
            "games" => $games,
            "users" => $users,
            "events" => $events
        ]);

        Cache::put('initialdata', $response, 5);
        
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
        if (Cache::has($service)) {
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

        return [];
    }

}
