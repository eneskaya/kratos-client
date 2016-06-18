import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Game from './Game';

import Start from './Start';
import Play from './Play';

import { Router, Route, Link, hashHistory } from 'react-router'

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

class Root extends Component {
    render() {
        return (
          <Router history={hashHistory}>
            <Route path="/" component={Start}/>

            <Route path="/play" component={Play}>
              <Route path="/play/games/:gameId" component={Game} />
            </Route>
          </Router>
        );
    }
}

ReactDOM.render(<Root />, document.getElementById('root'));
