import { legacy_createStore, combineReducers, applyMiddleware, compose } from 'redux';

import { reducer } from './reducer';
import {thunk} from "redux-thunk";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({ reducer });

export const store = legacy_createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
