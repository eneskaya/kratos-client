import { Actions } from './actions';
import Immutable from 'immutable';

const initialState = {
  status: 'unkown',
  players: [],
  services: [],
  name: 'none'
};

function gameApp(state = initialState, action) {

  switch (action) {
    
    case Actions.PLAYER_ADDED:
      return Object.assign({}, state, {
        players: players.concat(action.player)
      });

    case Actions.GAME_NAME_CHANGED:
      return Object.assing({}, state, {
        name: action.name
      });

    // implement those actions...

    // case Actions.ACCOUNT_BALANCE_CHANGED:
    //   break;
    //
    // case Actions.PLAYER_POSITION_CHANGED:
    //   break;
    //
    // case Actions.TURN_CHANGED:
    //   break;
    //
    // case Actions.PLAYER_BOUGHT_STREET:
    //   break;
    //
    // case Actions.GAME_STATUS_CHANGED:
    //   break;
    //
    // case Actions.PLAYER_READY_CHANGED:
    //   break;

    default:
      return state;
  }
}

export default gameApp;
