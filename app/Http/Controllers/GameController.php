<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Cache;

class GameController extends Controller
{
    public function getGame($gameId)
    {
        // TODO get account balance for each player
        return [
            'name' => 'testspielxy02',
            'players' => [
                [
                    'name' => 'enes',
                    'ready' => false,
                    'balance' => $this->getBalanceForPlayer('enes'),
                    'turn' => true, // TODO get this from service
                    'position' => 0 // TODO get this from service
                ],
                [
                    'name' => 'finn',
                    'ready' => false,
                    'balance' => $this->getBalanceForPlayer('enes'),
                    'turn' => false,
                    'position' => 0
                ],
                [
                    'name' => 'jakob',
                    'ready' => false,
                    'balance' => $this->getBalanceForPlayer('enes'),
                    'turn' => false,
                    'position' => 0
                ],
            ],
            'status' => 'registration',
            'services' => [
                'http://service1.example.com',
                'http://service2.example.com'
            ]
        ];

        $client = new Client();
        $res = $client->request('GET', Cache::get('KRATOSGameService') . '/' . $gameId);

        if ($res->getStatusCode() !== 200) {
            abort(404);
        }

        $game = json_decode($res->getBody()->getContents(), true);
        return $game;
    }

    public function getBalanceForPlayer($player) {
        return "0";
    }

    public function acquireTurnForFirstPlayer() {

    }

    public function createNewGame(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'services' => 'required|array'
        ]);

        //
    }
}
