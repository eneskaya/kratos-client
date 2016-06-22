import React, { Component } from 'react';
import PlayersList from './components/PlayersList';
import EventsList from './components/EventsList';
import PlayBar from './components/PlayBar';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';

import store from './flux/store';

import {
  addPlayerToGame,
  changeGameStatus,
  changeAccountBalance,
  changeTurn,
  changePawnPosition,
  playerBoughtAStreet,
  changeGameName,
  changePlayerReadyStatus,
  addEvent
} from './flux/actions';

import io from 'socket.io-client';
import env from './env';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
    this.initialize();
  }

  initialize() {

    fetch(`/games/${this.props.params.gameId}`).then( (response) => {
        response.json().then( (data) => {

          data.players.map( (player) => {
              store.dispatch(addPlayerToGame(player));
          });

          store.dispatch( changeGameStatus(data.status) );
          store.dispatch( changeGameName(data.name) );
        });
    });

    let socket = io(env);

    socket.on('connect', (socket) => {
      this.setState({
        socketOpen: true
      });
    });

    socket.on('event:added', (event) => {
      this.broadcastEvent(event.payload);
      console.log(event.payload);
    });

    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });
  }

  broadcastEvent(event) {

    // id of the current game
    let game = this.state.name;

    // id of the current player
    let player = localStorage.getItem('user');

    if (game === event.game) {

      switch (event.type) {
        case 'account_balance_changed':
          store.dispatch(changeAccountBalance(event.player, event.payload.after));
          store.dispatch(addEvent(event));
          break;

        case 'player_position_changed':
          store.dispatch(changePawnPosition(event.player, event.payload.after));
          store.dispatch(addEvent(event));
          break;

        case 'player_bought_street':
          store.dispatch(playerBoughtAStreet(event.player, event.payload.after));
          store.dispatch(addEvent(event));
          break;

        case 'game_status_changed':
          store.dispatch(changeGameStatus(event.payload.after));
          store.dispatch(addEvent(event));
          break;

        case 'player_ready_changed':
          store.dispatch(changePlayerReadyStatus(event.player));
          store.dispatch(addEvent(event));
          break;

        case 'turn_changed':
          store.dispatch(changeTurn(event.player));
          store.dispatch(addEvent(event));
          break;

        case 'player_is_broke':
          break;

        case 'game_has_finished':
          break;

        default:
          store.dispatch(addEvent(event));
          break;
      }

    }
  }

  render() {
    return (
      <div className="container-fluid" style={{ marginTop: 10 }}>
        <div className="row">
          <div className="col-sm-6 text-center">
            <h4>Player: {this.getLoggedInUsersObject().name}</h4>
            <small className="text-muted">{this.getLoggedInUsersObject().position}</small>
          </div>

          <div className="col-sm-6 text-center">
            <h4>Game: {this.props.params.gameId} {this.gameLabel()}</h4>
            <small className="text-muted">You are {localStorage.getItem('user')}</small>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-4">
            <PlayersList players={this.state.players} />
          </div>
          <div className="col-sm-8">
            <EventsList events={this.state.events} />
          </div>
        </div>
        <div>
          <PlayBar
            currentPlayer={this.state.currentPlayer}
            player={localStorage.getItem('user')}
            game={this.props.params.gameId} />
        </div>
      </div>
    );
  }

  getLoggedInUsersObject() {

    const loggedIn = localStorage.getItem('user');

    this.state.players.forEach( (player) => {
      if (player.name === loggedIn) {
        return player;
      }
    });

    return {};
  }

  gameLabel() {

    if (this.state.status === 'running') {
      return (
        <span className="label label-success">running</span>
      );
    }

    if (this.state.status === 'registration') {
      return (
        <span className="label label-danger">registration</span>
      );
    }

    return (
        <span className="label label-primary">{this.state.status}</span>
    );

  }

  componentWillUnmount() {
    this.unsubscribe();
  }

}

export default Game;
