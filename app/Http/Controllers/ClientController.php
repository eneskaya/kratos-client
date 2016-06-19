<?php

namespace App\Http\Controllers;

use App\Events\NewEventHasBeenAdded;
use App\Events\TurnHasBeenAnnounced;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Cache;

class ClientController extends Controller
{
    public function loginAsUser(Request $request)
    {
        $this->validate($request, [
            'player'    => 'required',
            'game'      => 'required'
        ]);

        $initialData = collect(Cache::get('initialdata'));

        $players = $initialData->get('users');
        $games = $initialData->get('games');

        if ($players->contains($request->input('player'))
            && $games->contains($request->input('game'))) {

            return response($request->all(), 200);
        }

        return response("Not a user of this game.", 422);
    }

    public function announceTurn(Request $request)
    {
        $this->validate($request, [
            'player' => 'required',
            'game' => 'required'
        ]);

        event(new TurnHasBeenAnnounced($request->input('player'), $request->input('game')));
    }

    public function announceEvent(Request $request)
    {
        $event = $request->all();
        event(new NewEventHasBeenAdded($event));

        return response(["success" => true], 200);
    }

    public function announceUserEvent(Request $request)
    {

    }
}
