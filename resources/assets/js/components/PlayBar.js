import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

class PlayBar extends Component {
  render() {
    return (
      <div className="text-center">
        <hr/>
        <RaisedButton primary label="Make your move" disabled={this.isTurnOfCurrentUser()} />
      </div>
    );
  }

  isTurnOfCurrentUser() {
    return true;
  }

}

export default PlayBar;
