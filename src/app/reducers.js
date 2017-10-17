import { combineReducers } from 'redux';

import efforts from "../efforts/effortsReducer";

const rootReducer = combineReducers({
	efforts
});

export default rootReducer;