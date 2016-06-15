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

Route::get('/', 'StartController@start');
Route::get('initial', 'StartController@getInitialData');
Route::get('games/{gameId}', 'GameController@getGame');

Route::post('client/login', 'ClientController@loginAsUser');

Route::post('client/turn', 'ClientController@announceTurn');
Route::post('client/event', 'ClientController@announceEvent');
