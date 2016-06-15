<?php

namespace App\Console;

use App\Console\Commands\GetYellowPagesURLs;
use App\Console\Commands\UpdateYellowPagesEntry;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        GetYellowPagesURLs::class,
        UpdateYellowPagesEntry::class
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->command('yellowpages:update')->everyMinute();
    }
}
