<?php

namespace App\Console\Commands;

use GuzzleHttp\Client;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;

class CreateNewGame extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'game:create';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new game';

    protected $client;

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
        $this->client = new Client();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $name = $this->ask('Name of the game?');

        if ($this->confirm('Would you like to get the URLs from YellowPages? [y|N]')) {

            $this->info('Getting URLs from cache...');

            $broker = Cache::get('KRATOSBrokerService');
            $this->info('KRATOSBrokerService...' . $broker);
            
            $bank = Cache::get('KRATOSBankService');
            $this->info('KRATOSBankService...' . $bank);

            $board = Cache::get('KRATOSBoardService');
            $this->info('KRATOSBoardService...' . $board);

        } else {
            $broker = $this->ask('Broker Service URL');
            $bank = $this->ask('Bank Service URL');
            $board = $this->ask('KRATOSBoardService');
        }

        $this->info('Creating the broker...');
        $request = $this->client->request('POST', $broker . "/$name");

        if ($request->getStatusCode() === 201) {
            $this->info('Broker created! ' . $request->getBody()->getContents() );
        }

        $this->info('Creating the board...');
        $request = $this->client->request('POST', $board, [
            'json' => [
                'gameUri' => $name
            ]
        ]);

        if ($request->getStatusCode() === 200) {
            $response = $request->getBody()->getContents();
            $this->info('Board created! ' . $response );
            $boardUrl = json_decode($response, true)["id"];
            $boardUrl = $board . "/$boardUrl";
        }

        $this->info('Creating the bank...');
        $request = $this->client->request('POST', $bank . "/$name", []);

        if ($request->getStatusCode() === 200) {
            $this->info('Bank created! ' . $request->getBody()->getContents() );
        }

        // Create a game
        $request = $this->client->request('POST', Cache::get('KRATOSGameService'), [
           'json' => [
                'name'  => $name,
                'services' => [
                    'bank'  => $bank . "/$name",
                    'broker' => $broker . "/$name",
                    'board' => $boardUrl
                ]
           ]
        ]);

        if ($request->getStatusCode() === 200) {
            $this->info('Game created!');
            $this->info($request->getBody()->getContents());
        }
    }
}
