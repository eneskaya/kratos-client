<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class UserController extends Controller
{
    public function showForm() {
        return view('user.create');
    }

    public function createUser(Request $request) {
        
    }
}
