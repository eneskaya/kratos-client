<?php

namespace App\Console\Commands;

use GuzzleHttp\Client;
use Illuminate\Console\Command;

class UpdateYellowPagesEntry extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'yellowpages:entry';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create an entry in the YellowPages service';
    protected $client;
    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();

        $this->client = new Client([
            'base_uri'  => 'https://141.22.34.15/cnt/172.18.0.5/4567/services',
        ]);
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $service = $this->choice('Which service?', [
            'KRATOSEventService',
            'KRATOSGameService',
            'KRATOSUserService',
            'KRATOSDiceService',
            'KRATOSBoardService',
            'KRATOSBankService',
            'KRATOSClientService'
        ]);

        if ($this->confirm('Do you wish to delete ALL old services first? [y|N]')) {
            $this->deleteOldServices($service);
        }

        $uri = $this->ask('Enter the new URI:');
        $data = $this->getServiceDetails($service);

        $res = $this->client->request('POST', '', [
            'auth'  => [ 'abs973', env('YELLOW_PASSWORD') ],
            'json'  => [
                'name'          => $service,
                'description'   => $data['description'],
                'service'       => $data['type'],
                'uri'           => $uri
            ],
            'verify' => false
        ]);

        if ($res->getStatusCode() === 201) {
            $this->info('Successfully registered new URL!');
            $res = \GuzzleHttp\json_decode($res->getBody()->getContents());
            $this->info($res->description);
            $this->info($res->_uri);
            $this->info($res->service);
            $this->info($res->status);
            $this->info($res->uri);
            $this->info($res->name);
        }
    }

    private function deleteOldServices($service) {

        $request = $this->client->request('GET', "services/of/name/$service", [
            'auth'  => [ 'abs973', env('YELLOW_PASSWORD') ],
            'verify' => false
        ]);

        $response = \GuzzleHttp\json_decode($request->getBody()->getContents());

        $services = collect($response->services);

        if ($services->count() > 0) {

            foreach ($services as $s) {
                $uri = ltrim($s, '/');
                $request = $this->client->request('DELETE', $uri, [
                    'auth'  => [ 'abs973', env('YELLOW_PASSWORD') ],
                    'verify' => false
                ]);

                if ($request->getStatusCode() === 200) {
                    $this->warn("Deleted $uri");
                }
            }
        }
    }

    private function getServiceDetails($service)
    {
        switch ($service) {
            case 'KRATOSEventService':
                return [
                    'type' => 'events',
                    'description' => 'Event Service for KRATOS'
                ];

            case 'KRATOSUserService':
                return [
                    'type' => 'user',
                    'description' => 'User Service for KRATOS'
                ];

            case 'KRATOSGameService':
                return [
                    'type' => 'game',
                    'description' => 'Game Service for KRATOS'
                ];

            case 'KRATOSDiceService':
                return [
                    'type' => 'dice',
                    'description' => 'Dice Service for KRATOS'
                ];

            case 'KRATOSBoardService':
                return [
                    'type' => 'board',
                    'description' => 'Board Service for KRATOS'
                ];

            case 'KRATOSBankService':
                return [
                    'type'  => 'bank',
                    'description'   => 'Bank Service for KRATOS'
                ];

            case 'KRATOSClientService':
                return [
                    'type'  => 'client',
                    'description'   => 'Client Service for KRATOS'
                ];
        }

        return [];
    }
}
