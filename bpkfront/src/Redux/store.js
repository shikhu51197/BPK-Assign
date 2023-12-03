import {
    applyMiddleware,
    legacy_createStore,
    combineReducers,
    compose,
  } from "redux";
  import thunk from "redux-thunk";
  import {reducer} from "./reducer"
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const rootRuducer = combineReducers({reducer });

  export const store = legacy_createStore(
    rootRuducer,
    composeEnhancers(applyMiddleware(thunk))
  );