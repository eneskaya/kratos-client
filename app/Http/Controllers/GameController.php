<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Cache;

class GameController extends Controller
{
    protected $client;

    public function __construct()
    {
        $this->client = new Client();
    }

    public function getGame($gameId)
    {
        $client = new Client();
        $req = $client->request('GET', Cache::get('KRATOSGameService') . '/' . $gameId);

        if ($req->getStatusCode() !== 200) {
            abort(404);
        }

        $data = \GuzzleHttp\json_decode($req->getBody()->getContents(), true);
        $status = $data['status'];
        $name = $data['name'];
        $players = $data['players'];
        $services = $data['services'];

        $enriched = collect();
        foreach ($players as $player) {
            $player['balance'] = $this->getBalanceForPlayer($services['bank'], $player['name']);
            $player['position'] = $this->getPositionForPlayer($services['board'], $player['name']);
            $player['turn'] = false;

            $enriched->push($player);
        }

        $players = $enriched;

        $data = collect(compact('status', 'name', 'players', 'services'));

        return $data;
    }

    public function getBalanceForPlayer($bankServiceAccountURL, $player)
    {
        $req = $this->client->request('GET', "$bankServiceAccountURL/accounts/$player");
        $data = \GuzzleHttp\json_decode($req->getBody()->getContents(), true);

        return $data['balance'];
    }

    public function getPositionForPlayer($serviceURL, $player)
    {
        $req = $this->client->request('GET', "$serviceURL/pawns/$player");
        $data = \GuzzleHttp\json_decode($req->getBody()->getContents(), true);

        return $data[0]['position'];
    }
}
