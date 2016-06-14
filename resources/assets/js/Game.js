import React, { Component } from 'react';
import Board from 'material-ui/svg-icons/hardware/developer-board';
import CircularProgress from 'material-ui/CircularProgress';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class Game extends Component {
  constructor(props) {
    super(props);
    this.initialize();
    this.state = {
      data: {
        id: 0,
        status: "unkown",
      },
      loading: true
    }
  }

  initialize() {
    fetch(`/games/${this.props.params.gameId}`).then( (response) => {
        response.json().then( (data) => {
          this.setState({ data });
        });
    })
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-sm-8">
            <h4>Game: {this.props.params.gameId}</h4>
            <small className="text-muted">{this.state.data.id}</small>
          </div>
          <div className="col-sm-4">
            <span className="text-muted pull-right">Status: {this.state.data.status}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
