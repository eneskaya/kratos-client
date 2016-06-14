import React, { Component } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReactDOM from 'react-dom';
import App from './App';

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

const muiTheme = getMuiTheme({

});

class Root extends Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <App />
            </MuiThemeProvider>
        );
    }
}

ReactDOM.render(<Root />, document.getElementById('root'));
