import { legacy_createStore } from "redux";
const INITIALIZE_COIN_DATA = "INITIALIZE_COIN_DATA";
const COIN_PRICE_DATA = "COIN_PRICE_DATA";
export const initializeCoinData = (data) => {
  return {
    type: INITIALIZE_COIN_DATA,
    payload: data
  }
}
export const coinPriceData = (data) => {
  return {
    type: COIN_PRICE_DATA,
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
    case COIN_PRICE_DATA:
        return {
          ...state,
          coinData: {
            ...state.coinData,
            coinPrice: action.payload
          }
        }
      default:
        return state;
  }
}

const store = legacy_createStore(reducer);
export default store;