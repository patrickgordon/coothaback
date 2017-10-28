import union from "lodash/union";

import {
	FETCH_CLUB_LEADERBOARD_SUCCESS
} from "./leaderboardActions";

const initialState = {
	keys: []
};

export const leaderboardReducer = (state = initialState, action) => {
	switch (action.type) {
	case FETCH_CLUB_LEADERBOARD_SUCCESS:
		return {
			...state,
			keys: union(state.keys, [action.payload.result])
		};

	default:
		return state;
	}
};

export default leaderboardReducer;