import * as Actions from "./actions";
import { initialState } from "../store/initialState";
// 全ての店の情報
export const ShopsReducer = (state = initialState.shops, action) => {
  switch (action.type) {
    case Actions.GET_SHOPS:
      console.log("Comic", action.payload);
      return { ...state, ...action.payload };
    case Actions.REMOVE_SHOPS:
      return initialState.shops;
    default:
      return state;
  }
};

// 一つの店の情報
export const OneShopsReducer = (state = initialState.oneShop, action) => {
  switch (action.type) {
    case Actions.ONE_SHOP:
      console.log("oneComic", action.payload);
      return { ...state, ...action.payload };
    case Actions.REMOVE_ONE_SHOP:
      return initialState.oneShop;
    default:
      return state;
  }
};
