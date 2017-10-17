import thunk from "redux-thunk";
import { applyMiddleware, createStore, compose } from 'redux';
import rootReducer from './reducers';

const middleware = [thunk];

const configureStore = (initialState = {}) =>
createStore(
	rootReducer,
	initialState,
	compose(
		applyMiddleware(...middleware),
		window.devToolsExtension ? window.devToolsExtension() : f => f,
	)
);

export default configureStore;