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
        $client = new Client();
        $res = $client->request('GET', Cache::get('KRATOSGameService') . '/' . $gameId);

        if ($res->getStatusCode() !== 200) {
            abort(404);
        }

        $game = json_decode($res->getBody()->getContents(), true);
        return $game;
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
