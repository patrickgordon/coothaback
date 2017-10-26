import { combineReducers } from "redux";

import authentication from "../authentication/authenticationReducer";
import efforts from "../efforts/effortsReducer";
import groups from "../groups/groupsReducer";
import entities from "./entitiesReducer";

const rootReducer = combineReducers({
	efforts,
	authentication,
	entities,
	groups
});

export default rootReducer;