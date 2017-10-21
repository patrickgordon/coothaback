import { checkCacheValid } from "redux-cache";

import { effortList } from "../app/schemas";
import { CALL_API } from "../app/apiMiddleware";

export const FETCH_REQUEST = "Efforts.FETCH_REQUEST";
export const FETCH_SUCCESS = "Efforts.FETCH_SUCCESS";
export const FETCH_FAILURE = "Efforts.FETCH_FAILURE";

export const fetchEfforts = () => (dispatch, getState) => {
	const isCacheValid = checkCacheValid(getState, "efforts");
	if (isCacheValid) { return null; }

	return dispatch({
		[CALL_API]: {
			types: [FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAILURE],
			endpoint: "/efforts",
			method: "GET",
			schema: effortList
		}
	});
};
