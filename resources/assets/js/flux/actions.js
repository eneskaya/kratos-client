
/*
 * action types
 */
export const Actions = {
  DICE_ROLL : 'DICE_ROLL',
  ACCOUNT_BALANCE_CHANGED : 'ACCOUNT_BALANCE_CHANGED',
  PLAYER_POSITION_CHANGED : 'PLAYER_POSITION_CHANGED',
  TURN_CHANGED : 'TURN_CHANGED',
  PLAYER_BOUGHT_STREET : 'PLAYER_BOUGHT_STREET',
  GAME_STATUS_CHANGED : 'GAME_STATUS_CHANGED',
  PLAYER_READY_CHANGED : 'PLAYER_READY_CHANGED',
  PLAYER_ADDED: 'PLAYER_ADDED',
  GAME_NAME_CHANGED: 'GAME_NAME_CHANGED',
  EVENT_ADDED: 'EVENT_ADDED'
};

/*
 * action creators
 */

export function addPlayerToGame(player) {
  return { type: Actions.PLAYER_ADDED, player }
}

export function changeTurn(player) {
  return { type: Actions.TURN_CHANGED, player }
}

export function changeAccountBalance(player, newBalance) {
  return { type: Actions.ACCOUNT_BALANCE_CHANGED, player, newBalance }
}

export function changePawnPosition(player, newPosition) {
  return { type: Actions.PLAYER_POSITION_CHANGED, player, newPosition }
}

export function playerBoughtAStreet(player, street) {
  return { type: Actions.PLAYER_BOUGHT_STREET, player, street }
}

export function changeGameStatus(status) {
  return { type: Actions.GAME_STATUS_CHANGED, status }
}

export function changeGameName(name) {
  return { type: Actions.GAME_NAME_CHANGED, name }
}

export function changePlayerReadyStatus(player) {
  return { type: Actions.PLAYER_READY_CHANGED, player }
}

export function addEvent(event) {
  return { type: Actions.EVENT_ADDED, event }
}
