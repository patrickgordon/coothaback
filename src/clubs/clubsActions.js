import { checkCacheValid } from "redux-cache";

import { clubList } from "../app/schemas";
import { CALL_API } from "../app/apiMiddleware";

export const FETCH_REQUEST = "Clubs.FETCH_REQUEST";
export const FETCH_SUCCESS = "Clubs.FETCH_SUCCESS";
export const FETCH_FAILURE = "Clubs.FETCH_FAILURE";

export const fetchClubs = () => (dispatch, getState) => {
	const isCacheValid = checkCacheValid(getState, "clubs");
	if (isCacheValid) { return null; }

	return dispatch({
		[CALL_API]: {
			types: [FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAILURE],
			endpoint: "/athlete/clubs",
			method: "GET",
			schema: clubList
		}
	});
};
