import React, { Component } from 'react';
import { List } from 'material-ui/List';
import Pawn from './Pawn';
import Subheader from 'material-ui/Subheader';

class PlayersList extends Component {

  render() {
    return (

      <List style={{ border: '1px solid #ccc' }}>

        <Subheader>Players</Subheader>

        { this.props.players.map( function(player) {
          return (
            <Pawn
              key={player.name}
              playerName={player.name}
              ready={player.ready}
              turn={player.turn}
              balance={player.balance}
            />
          );
        }) }

      </List>

    );
  }

}

PlayersList.propTypes = {
  players: React.PropTypes.array.isRequired
}

export default PlayersList;
