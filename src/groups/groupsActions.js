import { checkCacheValid } from "redux-cache";

import { groupList } from "../app/schemas";
import { CALL_API } from "../app/apiMiddleware";

export const FETCH_REQUEST = "Groups.FETCH_REQUEST";
export const FETCH_SUCCESS = "Groups.FETCH_SUCCESS";
export const FETCH_FAILURE = "Groups.FETCH_FAILURE";

export const fetchGroups = () => (dispatch, getState) => {
	const isCacheValid = checkCacheValid(getState, "groups");
	if (isCacheValid) { return null; }

	return dispatch({
		[CALL_API]: {
			types: [FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAILURE],
			endpoint: "/athlete/clubs",
			method: "GET",
			schema: groupList
		}
	});
};
