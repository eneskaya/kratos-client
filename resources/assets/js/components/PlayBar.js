import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

class PlayBar extends Component {
  render() {
    return (
      <div className="text-center">
        <hr/>
        <RaisedButton
          primary label="Make your move"
          onMouseDown={this.makeMove.bind(this)}
          disabled={!this.isTurnOfCurrentUser()} />
      </div>
    );
  }

  makeMove() {
    fetch(`/games/player/${this.props.player}/game/${this.props.game}/move`)
      .then( (response) => {
          // announce that move has been made
      });
  }

  isTurnOfCurrentUser() {
    console.log('currentPlayer', this.props.currentPlayer, 'player', this.props.player);
    return this.props.currentPlayer === this.props.player;
  }

}

PlayBar.propTypes = {
  currentPlayer: React.PropTypes.string.isRequired,
  player: React.PropTypes.string.isRequired,
  game: React.PropTypes.string.isRequired
};

export default PlayBar;
