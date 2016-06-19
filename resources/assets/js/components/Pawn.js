import React, { Component } from 'react';
import { ListItem } from 'material-ui/List';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import Star from 'material-ui/svg-icons/action/stars';
import {deepOrange300, greenA200, amber300, grey500} from 'material-ui/styles/colors';

class Pawn extends Component {

  render() {
    return (
      <ListItem
        primaryText={this.props.playerName}
        secondaryText={this.balance()}
        leftAvatar={this.ready()}
        rightAvatar={this.turn()} />
    );
  }

  ready() {
    if (this.props.ready) {
      return <AccountCircle color={greenA200} />;
    } else {
      return <AccountCircle color={deepOrange300} />;
    }
  }

  turn() {
    if (this.props.turn) {
      return <Star color={grey500} />
    }
  }

  balance() {
    // get balance here...
    return "Balance: 0€";
  }

}

Pawn.propTypes = {
  playerName: React.PropTypes.string.isRequired,
  turn: React.PropTypes.bool.isRequired,
  ready: React.PropTypes.bool.isRequired
}

export default Pawn;
