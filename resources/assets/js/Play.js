import React, { Component } from 'react';
import { hashHistory } from 'react-router';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

class Play extends Component {
  constructor(props) {
    super(props);
    this.initialize()
  }

  initialize() {
    if (!localStorage.getItem('user')) {
      hashHistory.push('/');
    }
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <AppBar title="KRATOS Restopoly"/>
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Play;
