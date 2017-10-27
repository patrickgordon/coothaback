import { combineReducers } from "redux";

import authentication from "../authentication/authenticationReducer";
import efforts from "../efforts/effortsReducer";
import clubs from "../clubs/clubsReducer";
import entities from "./entitiesReducer";

const rootReducer = combineReducers({
	efforts,
	authentication,
	entities,
	clubs
});

export default rootReducer;