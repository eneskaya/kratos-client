import React, { Component } from 'react';
import { List } from 'material-ui/List';
import Pawn from './Pawn';
import Subheader from 'material-ui/Subheader';

import env from '../env';
import io from 'socket.io-client';

class PlayersList extends Component {
  constructor(props) {
    super(props);

    let socket = io(env);
    socket.on('play:turn', (payload) => {
      this.announceTurn(payload);
    });

  }

  checkTurn() {
    // check whose turn it is
  }

  announceTurn(payload) {
    // give turn based on reception
  }

  render() {
    return (
      <div>
        <List style={{ border: '1px solid #ccc' }}>
          <Subheader>Players</Subheader>
          { this.props.players.map( function(player) {
            return (
              <Pawn
                key={player.name}
                playerName={player.name}
                ready={player.ready}
                turn={player.turn}
              />
            );
          }) }
        </List>
      </div>
    );
  }

}

PlayersList.propTypes = {
  players: React.PropTypes.array.isRequired
}

export default PlayersList;
