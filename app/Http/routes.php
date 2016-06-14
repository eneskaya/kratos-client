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
Route::get('games/{gameId}', 'GameController@getGame');

Route::post('client/turn', 'ClientController@announceTurn');
Route::post('client/event', 'ClientController@announceEvent');