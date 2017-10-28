import { combineReducers } from "redux";

import authentication from "../authentication/authenticationReducer";
import efforts from "../efforts/effortsReducer";
import clubs from "../clubs/clubsReducer";
import entities from "./entitiesReducer";
import leaderboard from "../leaderboard/leaderboardReducer";

const rootReducer = combineReducers({
	efforts,
	authentication,
	entities,
	clubs,
	leaderboard
});

export default rootReducer;