<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use Illuminate\Http\Request;

use App\Http\Requests;

class GameController extends Controller
{
    public function showGame($gameId)
    {
        $client = new Client();
        $res = $client->request('GET', env('GAME_SERVICE') . '/games/' . $gameId);

        if ($res->getStatusCode() !== 200) {
            abort(404);
        }

        $game = json_decode($res->getBody()->getContents(), true);
        return view('game.show')->with(compact('game'));
    }
}
