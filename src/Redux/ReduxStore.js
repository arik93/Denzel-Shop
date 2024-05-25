import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from 'redux';
import { thunk } from 'redux-thunk';

import AppReducer from './Reducers/AppReducer';
import ProductsReducer from './Reducers/ProductsReducer';
import CartReducer from './Reducers/CartReducer';
import WishlistReducer from './Reducers/WishlistReducer';


const reducers = combineReducers({
  AppReducer,
  ProductsReducer,
  CartReducer,
  WishlistReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default store;