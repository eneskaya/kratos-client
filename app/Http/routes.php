<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

use App\Events\SomeEvent;

Route::get('/', 'StartController@start');

Route::get('initial', 'StartController@getInitialData');
Route::get('games/{gameId}', 'GameController@showGame');

Route::get('test', function () {
    event(new SomeEvent());

    return "DONE";
});