import React, { Component } from 'react';
import Board from 'material-ui/svg-icons/hardware/developer-board';
import CircularProgress from 'material-ui/CircularProgress';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';

import io from 'socket.io-client';
import env from './env';

class Game extends Component {
  constructor(props) {
    super(props);

    this.initialize();

    this.state = {
      socketOpen: false,
      data: {
        id: 0,
        status: "unkown",
      },
      loading: true
    };
  }

  initialize() {

    fetch(`/games/${this.props.params.gameId}`).then( (response) => {
        response.json().then( (data) => {
          this.setState({ data });
        });
    });

    let socket = io(env);

    socket.on('connect', (socket) => {
      this.setState({
        socketOpen: true
      });
    });

    socket.on('event:added', (message) => {
      console.log(message);
      //
    });

  }

  render() {
    return (
      <div className="container-fluid" style={{ marginTop: 10 }}>
        <div className="row">
          <div className="col-sm-8">
            <h4>Game: {this.props.params.gameId}</h4>
            <small className="text-muted">In {this.state.data.id} as {localStorage.getItem('user')}</small>
          </div>
          <div className="col-sm-4">
            <span className="text-muted pull-right">Status: {this.state.data.status}</span>
          </div>
        </div>

        <Snackbar
          open={this.state.socketOpen}
          message="Socket connection established."
          autoHideDuration={4000}
        />

      </div>
    );
  }
}

export default Game;
