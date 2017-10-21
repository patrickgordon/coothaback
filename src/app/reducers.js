import { combineReducers } from "redux";

import efforts from "../efforts/effortsReducer";
import entities from "./entitiesReducer";

const rootReducer = combineReducers({
	efforts,
	entities
});

export default rootReducer;