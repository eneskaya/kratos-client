<?php

namespace App\Http\Controllers;

use GuzzleHttp\Exception\BadResponseException;
use Illuminate\Http\Request;
use GuzzleHttp\Client;
use App\Http\Requests;
use Illuminate\Support\Collection;

class StartController extends Controller
{
    protected $client;

    public function __construct()
    {
        $this->client = new Client();
    }

    public function start()
    {
        $games = collect($this->getOpenGames()["games"]);
        $users = collect($this->getUsers());
        return view('welcome')->with(compact('games', 'users'));
    }

    public function getOpenGames()
    {
        $uri = env('GAME_SERVICE');
        $res = $this->client->request('GET', $uri . '/games', [
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
        $uri = env('USER_SERVICE');
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
