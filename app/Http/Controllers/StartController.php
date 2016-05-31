<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use App\Http\Requests;
use Illuminate\Support\Collection;

class StartController extends Controller
{
    protected $client;

    public function __construct()
    {
        $this->client = new Client();
    }

    public function start()
    {
        $users = $this->getUsers();

        return view('welcome');
    }

    /**
     * Get all users.
     *
     * @return mixed
     */
    private function getUsers()
    {
        // users endpoint for ...
        $res = $this->client->request('GET', 'http://example.com', [
           'auth' => [ config('app.api.user'), config('app.api.password') ]
        ]);

        $data = json_decode($res->getBody()->getContents());
        $users = new Collection($data);

        return $users;
    }
}
