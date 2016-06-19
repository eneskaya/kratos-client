import React, { Component } from 'react';
import PlayersList from './components/PlayersList';

import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import {grey800, greenA200} from 'material-ui/styles/colors';

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
          break;

        case 'player_position_changed':
          store.dispatch(changePawnPosition(event.player, event.payload.after));
          break;

        case 'player_bought_street':
          store.dispatch(playerBoughtAStreet(event.player, event.payload.after));
          break;

        case 'game_status_changed':
          store.dispatch(changeGameStatus(event.payload.after));
          break;

        case 'player_ready_changed':
          store.dispatch(changePlayerReadyStatus(event.player, event.payload.after));
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
          <div className="col-sm-8">
            <h4>Game: {this.props.params.gameId} <span className="badge badge-primary">{this.state.status}</span></h4>
            <small className="text-muted">You are {localStorage.getItem('user')}</small>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-4">
            <PlayersList players={this.state.players} />
          </div>
        </div>
      </div>
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

}

export default Game;
