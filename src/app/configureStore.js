import thunk from "redux-thunk";
import { applyMiddleware, createStore, compose } from 'redux';
import { autoRehydrate } from 'redux-persist'

import rootReducer from './reducers';
import apiMiddleware from "./apiMiddleware";

const middleware = [thunk, apiMiddleware];

const configureStore = (initialState = {}) => createStore(
	rootReducer,
	initialState,
	compose(
		applyMiddleware(...middleware),
		autoRehydrate(),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	)
);

export default configureStore;