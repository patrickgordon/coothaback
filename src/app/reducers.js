import { combineReducers } from "redux";

import authentication from "../authentication/authenticationReducer";
import efforts from "../efforts/effortsReducer";
import entities from "./entitiesReducer";

const rootReducer = combineReducers({
	efforts,
	authentication,
	entities
});

export default rootReducer;