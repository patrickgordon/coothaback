import { CALL_API } from "../app/apiMiddleware";
import { leaderboard } from "../app/schemas";

export const FETCH_CLUB_LEADERBOARD_REQUEST = "Leaderboards.FETCH_CLUB_LEADERBOARD_REQUEST";
export const FETCH_CLUB_LEADERBOARD_SUCCESS = "Leaderboards.FETCH_CLUB_LEADERBOARD_SUCCESS";
export const FETCH_CLUB_LEADERBOARD_FAILURE = "Leaderboards.FETCH_CLUB_LEADERBOARD_FAILURE";

export const fetchClubLeaderboard = (clubId) => (dispatch, getState) => {
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
