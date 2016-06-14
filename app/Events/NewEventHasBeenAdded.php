<?php

namespace App\Events;

use App\Events\Event;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class NewEventHasBeenAdded extends Event implements ShouldBroadcast
{
    use SerializesModels;
    
    public $eventPayload;

    /**
     * Create a new event instance.
     *
     * @param $eventPayload
     */
    public function __construct($eventPayload)
    {
        $this->eventPayload = $eventPayload;
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
