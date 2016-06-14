<?php

namespace App\Console\Commands;

use GuzzleHttp\Client;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Redis;

class GetYellowPagesURLs extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'yellowpages:update';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Get the latest Service URLs from the yellow pages.';

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
            'base_uri'  => 'http://172.18.0.5:4567',
            'timeout'  => 3
        ]);
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $this->info('Getting URLs from service...');
        $this->info('KRATOSGameService' . $this->getServiceUrl('KRATOSGameService'));
        $this->info('KRATOSUserService' . $this->getServiceUrl('KRATOSUserService'));
        $this->info('KRATOSEventsService' . $this->getServiceUrl('KRATOSEventsService'));
    }

    private function getServiceUrl($serviceName)
    {
        $request = $this->client->request('GET', "services/of/name/$serviceName");
        $response = \GuzzleHttp\json_decode($request->getBody()->getContents());

        $request = $this->client->request('GET', $response->services[0]);
        $response = \GuzzleHttp\json_decode($request->getBody()->getContents());

        Cache::put($serviceName, $response->uri, 1440);
        return $response->uri;
    }
}
