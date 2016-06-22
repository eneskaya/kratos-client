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

Route::group([ 'prefix' => 'games' ], function () {
    Route::get('{gameId}', 'GameController@getGame');
    Route::get('player/{player}/game/{game}/move', 'GameController@makeMove');
});

Route::group([ 'prefix' => 'client' ], function () {
    Route::post('login', 'ClientController@loginAsUser');
    Route::post('turn', 'ClientController@announceTurn');
    Route::post('event', 'ClientController@announceEvent');
    Route::post('{user}', 'ClientController@announceUserEvent');
});