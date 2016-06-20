<?php

namespace App\Events;

use App\Events\Event;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Support\Facades\Log;

class NewEventHasBeenAdded extends Event implements ShouldBroadcast
{
    use SerializesModels;
    
    public $payload;

    /**
     * Create a new event instance.
     *
     * @param $payload
     */
    public function __construct($payload)
    {
        $this->payload = $payload;
    }

    /**
     * Get the channels the event should be broadcast on.
     *
     * @return array
     */
    public function broadcastOn()
    {
        return [
            'event'
        ];
    }

    public function broadcastAs()
    {
        return 'added';
    }
}
