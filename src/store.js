import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/index';
import thunk from 'redux-thunk';
import { saveState, loadState } from './localStorage';
import throttle from 'lodash/throttle';

const initState = loadState()

const store = createStore(rootReducer, initState,  applyMiddleware(thunk));

export default store;

store.subscribe(throttle(() => {
  saveState({
    settings : store.getState().settings, 
    questions : store.getState().questions, 
  })
}), 1000)

