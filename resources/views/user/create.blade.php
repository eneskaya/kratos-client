@extends('layout.main')

@section('content')
    <div class="row">
        <div class="col-md-5">
            <form action="{{ action('UserController@createUser') }}" method="POST">
                {!! csrf_field() !!}
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email">
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email">
                </div>

            </form>
        </div>
    </div>
@stop