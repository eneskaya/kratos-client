import { createStore } from 'redux'
import gameApp from './reducer'

const initialState = {
  status: 'unkown',
  players: [],
  services: [],
  name: 'none'
};

export const store = createStore(gameApp, initialState, window.devToolsExtension && window.devToolsExtension());
