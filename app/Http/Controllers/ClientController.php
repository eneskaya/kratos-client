<?php

namespace App\Http\Controllers;

use App\Events\NewEventHasBeenAdded;
use Illuminate\Http\Request;

use App\Http\Requests;

class ClientController extends Controller
{
    public function announceTurn(Request $request)
    {
        $this->validate($request, [

        ]);
    }

    public function announceEvent(Request $request)
    {
        $this->validate($request, [

        ]);

        $event = $request->input('event');
        event(new NewEventHasBeenAdded($event));

        return response("OK", 200);
    }
}
