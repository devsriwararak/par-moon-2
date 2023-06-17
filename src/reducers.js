// reducers.js
import { SELECT_BUTTON } from './actions';

const initialState = {
  selectedButton: '0',
};

function buttonReducer(state = initialState, action) {
  switch (action.type) {
    case SELECT_BUTTON:
      return { ...state, selectedButton: action.payload };
    default:
      return state;
  }
}

export default buttonReducer;
