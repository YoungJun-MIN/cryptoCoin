import { legacy_createStore } from "redux";
export const INITIALIZE_COIN_DATA = "INITIALIZE_COIN_DATA";
export const TEST = 'TEST';
export const initializeCoinData = (data) => {
  return {
    type: INITIALIZE_COIN_DATA,
    payload: data
  }
}
export const test = (data) => {
  return {
    type: TEST,
    payload: data
  }
}
const reducer = (state = {}, action) => {
  switch(action.type) {
    case INITIALIZE_COIN_DATA:
      return {
        ...state,
        coinData: action.payload
      };
      default:
        return state;
  }
}

const store = legacy_createStore(reducer);
export default store;