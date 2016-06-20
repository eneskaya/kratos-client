import { Actions } from './actions';
import Immutable from 'immutable';

export const initialState = {
  status: 'unkown',
  players: [],
  services: [],
  name: 'none',
  ownedStreets: [],
  events: []
};

/**************[HELPER FUNCTIONS]**************/

function changeTurn(oldPlayers, playerWhoIsInTurnNow) {

  let newPlayers = [];

  oldPlayers.map( (player) => {

    let newPlayer = Object.assign({}, player, { turn: false });

    if (player.name === playerWhoIsInTurnNow) {
      newPlayer.turn = true;
    }

    newPlayers.push(newPlayer);
  });

  return newPlayers;
}

function changeBalance(oldPlayers, playerWhoseBalanceHasChanged, newBalance) {

  let newPlayers = [];

  oldPlayers.map( (player) => {

    let newPlayer = {};

    if (player.name === playerWhoseBalanceHasChanged) {
      newPlayer = Object.assign({}, player, { balance: newBalance });
    } else {
      newPlayer = Object.assign({}, player);
    }

    newPlayers.push(newPlayer);
  });

  return newPlayers;
}

function changePosition(oldPlayers, playerWhosePositionHasChanged, newPosition) {

  let newPlayers = [];

  oldPlayers.map( (player) => {

    let newPlayer = {};

    if (player.name === playerWhosePositionHasChanged) {
      newPlayer = Object.assign({}, player, { position: newPosition });
    } else {
      newPlayer = Object.assign({}, player);
    }

    newPlayers.push(newPlayer);
  });

  return newPlayers;
}

function changeReadyStatus(oldPlayers, playerWhoseReadyStatusHasChanged, status) {

  let newPlayers = [];

  oldPlayers.map( (player) => {

    let newPlayer = {};

    if (player.name === playerWhoseReadyStatusHasChanged) {
      newPlayer = Object.assign({}, player, { ready: status });
    } else {
      newPlayer = Object.assign({}, player);
    }

    newPlayers.push(newPlayer);
  });

  return newPlayers;
}

/**************[]**************/

function gameApp(state = initialState, action) {

  switch (action.type) {

    case Actions.PLAYER_ADDED:
      return Object.assign({}, state, {
        players: state.players.concat(action.player)
      });

    case Actions.GAME_STATUS_CHANGED:
      return Object.assign({}, state, {
        status: action.status
      });

    case Actions.GAME_NAME_CHANGED:
      return Object.assign({}, state, {
        name: action.name
      });

    case Actions.TURN_CHANGED:
      return Object.assign({}, state, {
        players: changeTurn(state.players, action.player)
      });

    case Actions.ACCOUNT_BALANCE_CHANGED:
      return Object.assign({}, state, {
        players: changeBalance(state.players, action.player, action.balance)
      });

    case Actions.PLAYER_POSITION_CHANGED:
      return Object.assign({}, state, {
        players: changePosition(state.players, action.player, action.position)
      });

    case Actions.EVENT_ADDED:
      return Object.assign({}, state, {
        events: state.events.concat(action.event)
      });

    case Actions.PLAYER_READY_CHANGED:
      return Object.assign({}, state, {
        players: changeReadyStatus(state.players, action.player, true)
      });

    case Actions.PLAYER_BOUGHT_STREET:
      return state;

    default:
      return state;
  }
}

export default gameApp;
