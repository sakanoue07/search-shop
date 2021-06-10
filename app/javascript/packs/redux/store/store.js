import { ShopsReducer, OneShopsReducer } from "../shops/reducers";
import { createBrowserHistory } from "history";
import { connectRouter, routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from "redux";

export const history = createBrowserHistory();
export const rootReducers = combineReducers({
  router: connectRouter(history),
  ShopsReducer: ShopsReducer,
  OneShopsReducer: OneShopsReducer,
});

export const store = createStore(
  rootReducers,
  applyMiddleware(thunk, routerMiddleware(history))
);
