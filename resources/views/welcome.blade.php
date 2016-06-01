@extends('layout.main')

@section('content')

    <div class="row">
        <div class="col-md-4">
            <h4>Open games</h4>
            <small class="text-muted">Service URL: {{ env('GAME_SERVICE') }}</small>
            <hr>
            @if($games->isEmpty())
                No games currently.
            @endif
            <ul>
                @foreach($games as $game)
                    <li>
                        {{ $game }}
                        <a href="{{ url($game) }}">Show game</a>
                    </li>

                @endforeach
            </ul>
        </div>
        <div class="col-md-4">
            <h4>Users</h4>
            <small class="text-muted">Service URL: {{ env('USER_SERVICE') }}</small>
            <hr>
            @if($users->isEmpty())
                No users currently.
            @endif
            <ul>
                @foreach($users as $user)
                    <li>{{ $user }}</li>
                @endforeach
            </ul>
        </div>
    </div>

@stop