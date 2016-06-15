<?php

namespace App\Http\Controllers;

use App\Events\NewEventHasBeenAdded;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Session;

class ClientController extends Controller
{

    public function loggedIn()
    {
        return [
            'current_player' => session('current_player'),
            'joined_game' => session('joined_game')
        ];
    }

    public function loginAsUser(Request $request)
    {
        $this->validate($request, [
            'player'    => 'required',
            'game'      => 'required'
        ]);

        $initialData = collect(Cache::get('initialdata'));

        $players = $initialData->get('users');

        $games = $initialData->get('games');
        $players->search($request->input('player'));

        if ($players->contains($request->input('player'))
            && $games->contains($request->input('game'))) {

            session('current_player', $request->input('player'));
            session('joined_game', $request->input('game'));

            return response($request->all(), 200);
        }

        return response("Not a user of this game.", 422);
    }

    public function announceTurn(Request $request)
    {
        $this->validate($request, [
            'player' => 'required'
        ]);

        // TODO announce logic and broadcast to the currently logged in user
    }

    public function announceEvent(Request $request)
    {
        $this->validate($request, [
            'payload'   => 'required'
        ]);

        $event = $request->input('payload');
        event(new NewEventHasBeenAdded($event));

        return response("OK", 200);
    }
}
