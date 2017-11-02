import { checkCacheValid } from "redux-cache";

import { CALL_API } from "../app/apiMiddleware";
import { leaderboard } from "../app/schemas";

export const FETCH_FOLLOWING_LEADERBOARD_REQUEST = "Leaderboards.FETCH_FOLLOWING_LEADERBOARD_REQUEST";
export const FETCH_FOLLOWING_LEADERBOARD_SUCCESS = "Leaderboards.FETCH_FOLLOWING_LEADERBOARD_SUCCESS";
export const FETCH_FOLLOWING_LEADERBOARD_FAILURE = "Leaderboards.FETCH_FOLLOWING_LEADERBOARD_SUCCESS";

export const fetchFollowingLeaderboard = () => (dispatch, getState) => {
	const accessStrategy = (state, reducerKey, cacheKey) => {
		return state[reducerKey]
			&& state[reducerKey].leaderboard
			&& state[reducerKey].leaderboard.following
			&& state[reducerKey].leaderboard.following[cacheKey];
	};

	const isCacheValid = checkCacheValid(getState, "entities", { accessStrategy });
	if (isCacheValid) { return null; }

	return {
		[CALL_API]: {
			types: [FETCH_FOLLOWING_LEADERBOARD_REQUEST, FETCH_FOLLOWING_LEADERBOARD_SUCCESS, FETCH_FOLLOWING_LEADERBOARD_FAILURE],
			endpoint: "/segments/2660310/leaderboard?following=true",
			method: "GET",
			schema: leaderboard
		}
	};
};

export const FETCH_CLUB_LEADERBOARD_REQUEST = "Leaderboards.FETCH_CLUB_LEADERBOARD_REQUEST";
export const FETCH_CLUB_LEADERBOARD_SUCCESS = "Leaderboards.FETCH_CLUB_LEADERBOARD_SUCCESS";
export const FETCH_CLUB_LEADERBOARD_FAILURE = "Leaderboards.FETCH_CLUB_LEADERBOARD_FAILURE";

export const fetchClubLeaderboard = (clubId) => (dispatch, getState) => {
	const accessStrategy = (state, reducerKey, cacheKey) => {
		return state[reducerKey]
			&& state[reducerKey].leaderboard
			&& state[reducerKey].leaderboard[clubId]
			&& state[reducerKey].leaderboard[clubId][cacheKey];
	};

	const isCacheValid = checkCacheValid(getState, "entities", { accessStrategy });
	if (isCacheValid) { return null; }

	return dispatch({
		[CALL_API]: {
			types: [FETCH_CLUB_LEADERBOARD_REQUEST, FETCH_CLUB_LEADERBOARD_SUCCESS, FETCH_CLUB_LEADERBOARD_FAILURE],
			endpoint: `/segments/2660310/leaderboard?club_id=${clubId}`,
			method: "GET",
			schema: leaderboard,
			meta: {
				args: {
					clubId
				}
			}
		}
	});
};
