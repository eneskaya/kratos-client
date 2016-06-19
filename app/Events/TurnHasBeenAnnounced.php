<?php

namespace App\Events;

use App\Events\Event;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class TurnHasBeenAnnounced extends Event
{
    use SerializesModels;

    public $player;
    public $game;

    /**
     * Create a new event instance.
     *
     * @param $player
     */
    public function __construct($player, $game)
    {
        $this->player = $player;
        $this->game = $game;
    }

    /**
     * Get the channels the event should be broadcast on.
     *
     * @return array
     */
    public function broadcastOn()
    {
        return [
            'play'
        ];
    }

    /**
     * Event broadcasted as: 'play:turn'
     *
     * @return string
     */
    public function broadcastAs()
    {
        return "turn";
    }
}
