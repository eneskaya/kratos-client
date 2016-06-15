import React, { Component } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Extension from 'material-ui/svg-icons/action/extension';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import Subheader from 'material-ui/Subheader';

import { hashHistory } from 'react-router';

class Start extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dialogOpen: true,
      users: [],
      games: []
    };

    this.initialize();
  }

  initialize() {

    // redirect logged in user to play
    if (localStorage.getItem('user')) {
      hashHistory.push('/play');
      return;
    }

    fetch('/initial').then( (response) => {
      response.json().then( (data) => {
        this.setState({
          users: data.users,
          games: data.games
        });
      });
    });
  }

  handleUserSelect(event, index, value) {
    this.setState({selectedUser: value});
  }

  handleGameSelect(event, index, value) {
    this.setState({selectedGame: value});
  }

  joinGame() {

    fetch('/client/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        player: this.state.selectedUser,
        game: this.state.selectedGame
      })
    }).then( (response) => {
      if (response.status === 200) {

        response.json().then( (data) => {
          localStorage.setItem('user', data.player);
          localStorage.setItem('game', data.game);
          hashHistory.push('/play');
        });
      }
    });

  }

  render() {

    const actions = [
      <FlatButton
        label="Join"
        primary={true}
        onTouchTap={this.joinGame.bind(this)}
      />
    ];

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <div className="container-fluid">
            <Dialog
              title="Join a game!"
              actions={actions}
              open={this.state.dialogOpen}
              contentStyle={{ width: '300px' }}
            >
              <Subheader>User</Subheader>
              <SelectField value={this.state.selectedUser} onChange={this.handleUserSelect.bind(this)}>
                { this.state.users.map( function(user) {
                  return (
                    <MenuItem key={user} value={user} primaryText={user} />
                  );
                }) }
              </SelectField>

              <Subheader>Game</Subheader>
              <SelectField value={this.state.selectedGame} onChange={this.handleGameSelect.bind(this)}>
                { this.state.games.map( function(game) {
                  return (
                    <MenuItem key={game} value={game} primaryText={game} />
                  );
                }) }
              </SelectField>
            </Dialog>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Start;
