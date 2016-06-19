import { createStore } from 'redux'
import gameApp, { initialState } from './reducer'

const store = createStore(gameApp, initialState, window.devToolsExtension && window.devToolsExtension());

export default store;
