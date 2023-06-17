// store.js
import { createStore } from 'redux';
import buttonReducer from './reducers';

const store = createStore(buttonReducer);

export default store;
