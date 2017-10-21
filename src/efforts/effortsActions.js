import { checkCacheValid } from "redux-cache";

import { effortList } from "../app/schemas";
import { CALL_API } from "../app/apiMiddleware";

export const FETCH_REQUEST = "Efforts.FETCH_REQUEST";
export const FETCH_SUCCESS = "Efforts.FETCH_SUCCESS";
export const FETCH_FAILURE = "Efforts.FETCH_FAILURE";

export const fetchEfforts = () => (dispatch, getState) => {
	const isCacheValid = checkCacheValid(getState, "efforts");
	if (isCacheValid) { return null; }

	const state = getState();
	const accessToken = state.authentication && state.authentication.accessToken;
	const athleteId = state.entities.authentication[accessToken].athlete;

	return dispatch({
		[CALL_API]: {
			types: [FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAILURE],
			endpoint: `/segments/2660310/all_efforts?athlete_id=${athleteId}`,
			method: "GET",
			schema: effortList
		}
	});
};
