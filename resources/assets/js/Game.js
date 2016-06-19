import React, { Component } from 'react';
import Board from 'material-ui/svg-icons/hardware/developer-board';
import CircularProgress from 'material-ui/CircularProgress';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import PlayersList from './components/PlayersList';

import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import {grey800, greenA200} from 'material-ui/styles/colors';


import io from 'socket.io-client';
import env from './env';

class Game extends Component {
  constructor(props) {
    super(props);

    this.initialize();

    this.state = {
      socketOpen: false,
      game: {
        id: 0,
        status: "unkown",
        players: [
          {
            name : "enes",
            ready: false
          },
          {
            name : "finn",
            ready: true
          },
          {
            name : "jakob",
            ready: false
          }
        ],
        name: "testspielxy02"
      },
      loading: true
    };
  }

  initialize() {

    // fetch(`/games/${this.props.params.gameId}`).then( (response) => {
    //     response.json().then( (data) => {
    //       this.setState({ game: data });
    //     });
    // });

    let socket = io(env);

    socket.on('connect', (socket) => {
      this.setState({
        socketOpen: true
      });
    });

    socket.on('event:added', (event) => {
      this.broadcastEvent(event);
    });

  }

  broadcastEvent(event) {
    
    // id of the current game
    let game = this.state.game.name;

    // id of the current player
    let player = this.state.game.player;

    // check relevancy of event
    if (game === event.game) {
      switch (event.type) {

        case 'dice_roll':

          break;

        case 'account_balance_changed':

          break;

        case 'player_position_changed':

          break;

        case 'turn_changed':

          break;

        case 'player_bought_street':

          break;

        case 'game_status_changed':

          break;

        case 'player_ready_changed':

          break;

        default:
          break;
      }
    }
  }

  render() {
    return (
      <div className="container-fluid" style={{ marginTop: 10 }}>
        <div className="row">
          <div className="col-sm-8">
            <h4>Game: {this.props.params.gameId}</h4>
            <small className="text-muted">In {this.state.game.id} as {localStorage.getItem('user')}</small>
          </div>
          <div className="col-sm-4">
            <span className="text-muted pull-right">Status: {this.state.game.status}</span>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-4">
            <PlayersList players={this.state.game.players} />
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
