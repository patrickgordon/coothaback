import thunk from "redux-thunk";
import { applyMiddleware, createStore, compose } from "redux";
import { autoRehydrate } from "redux-persist";
import { cacheEnhancer } from "redux-cache";

import rootReducer from "./reducers";
import apiMiddleware from "./apiMiddleware";

const middleware = [thunk, apiMiddleware];

const configureStore = (initialState = {}) => createStore(
	rootReducer,
	initialState,
	compose(
		applyMiddleware(...middleware),
		cacheEnhancer(),
		autoRehydrate(),
		process.env.NODE_ENV !== "production" && window.devToolsExtension ? window.devToolsExtension() : f => f
	)
);

export default configureStore;