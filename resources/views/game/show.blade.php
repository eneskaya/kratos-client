@extends('layout.main')

@section('content')
    <div class="row">
        <div class="col-md-5">
            <table class="table">
                <tr>
                    <td>ID</td>
                    <td>{{ $game["id"] }}</td>
                </tr>
                <tr>
                    <td>Name</td>
                    <td>{{ $game["name"] }}</td>
                </tr>
                <tr>
                    <td>Status</td>
                    <td>{{ $game["status"] ?: "n/a" }}</td>
                </tr>
            </table>
        </div>
    </div>

    <pre>
        {{ var_dump($game) }}
    </pre>
@stop