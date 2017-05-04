import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from './middleware/logger.js'
import thunk  from './middleware/thunk.js'
import reducer from './reducers/app_reducer.js'
import {MapReducer} from 'react-redux-mapbox-gl';

const rootReducer = combineReducers ({
  reducer,
  MapReducer
});

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      thunk,
      logger
    )
  )
);

export default store;
