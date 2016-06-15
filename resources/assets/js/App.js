import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import {List, ListItem} from 'material-ui/List';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import PlayButton from 'material-ui/svg-icons/av/play-arrow';
import Snackbar from 'material-ui/Snackbar';
import LinearProgress from 'material-ui/LinearProgress';
import { Link } from 'react-router'
import Identity from 'material-ui/svg-icons/action/perm-identity';
import IconButton from 'material-ui/IconButton';
import Extension from 'material-ui/svg-icons/action/extension';

import io from 'socket.io-client';
import env from './env';

export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            games: [],
            users: [],
            socketOpen: false,
            progress: 0
        };

        let socket = io(env);

        socket.on('connect', (socket) => {
          console.log('Connected!');

          this.setState({
            socketOpen: true
          });
        });

        socket.on('event:added', (message) => {
          console.log(message);
        });

        this.initialize();
    }

    initialize() {
        fetch('/initial').then( (response) => {
            response.json().then( (data) => {
                this.setState({
                    users: data.users,
                    games: data.games,
                    progress: 100
                });
            });
        })
    }

    render() {
        return (
          <MuiThemeProvider muiTheme={getMuiTheme()}>
            <div>
              <AppBar title="KRATOS Restopoly" iconElementLeft={<IconButton><Extension /></IconButton>}/>

              <div className="container-fluid row" style={{marginTop: 10}}>
                <div className="col-sm-4">
                  <h4>Overview</h4>

                  <LinearProgress mode="determinate" value={this.state.progress} />
                  <div style={{border: '1px solid #ccc'}}>
                    <List>
                      <Subheader>Games</Subheader>
                      { this.state.games.map( function(game) {
                        return <Link to={game} key={game}><ListItem primaryText={game} rightIcon={<PlayButton />} /></Link>
                      }) }
                    </List>
                    <Divider />
                    <List>
                      <Subheader>Users</Subheader>
                      { this.state.users.map( function(user) {
                        return <ListItem key={user} primaryText={user} leftIcon={<Identity />} />
                      }) }
                    </List>
                  </div>
                </div>
                <div className="col-sm-8">
                  {this.props.children}
                </div>
              </div>

              <Snackbar
                open={this.state.socketOpen}
                message="Socket connection established."
                autoHideDuration={4000}
              />

            </div>

          </MuiThemeProvider>

        );
    }
}
