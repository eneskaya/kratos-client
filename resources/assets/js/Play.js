import React, { Component } from 'react';
import { hashHistory } from 'react-router';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

class Play extends Component {
  constructor(props) {
    super(props);

    this.state = {
      drawerOpen: false
    };

    this.initialize()
  }

  initialize() {
    if (!localStorage.getItem('user')) {
      hashHistory.push('/');
    }
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('game');

    this.setState({ drawerOpen: false });

    hashHistory.push('/');
  }

  toggleDrawer() {
    this.setState({
      drawerOpen: !this.state.drawerOpen
    });
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <AppBar
            title="KRATOS Restopoly"
            onLeftIconButtonTouchTap={this.toggleDrawer.bind(this)}
          />
          <Drawer open={this.state.drawerOpen} docked={false}>
            <MenuItem onClick={this.logout.bind(this)}>Leave Game!</MenuItem>
            <MenuItem onClick={this.toggleDrawer.bind(this)}>Close Menu</MenuItem>
          </Drawer>
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Play;
