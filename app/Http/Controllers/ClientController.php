<?php

namespace App\Http\Controllers;

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
        
    }
}
