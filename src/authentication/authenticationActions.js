import { checkCacheValid } from "redux-cache";

import { authentication } from "../app/schemas";
import { CALL_API } from "../app/apiMiddleware";

export const FETCH_REQUEST = "Authentication.POST_REQUEST";
export const FETCH_SUCCESS = "Authentication.POST_SUCCESS";
export const FETCH_FAILURE = "Authentication.POST_FAILURE";

export const authorize = (code) => (dispatch, getState) => {
	if (!code) { return null; }

	const isCacheValid = checkCacheValid(getState, "authentication");
	if (isCacheValid) { return null; }

	return dispatch({
		[CALL_API]: {
			types: [FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAILURE],
			endpoint: "/oauth/token",
			method: "POST",
			schema: authentication,
			body: {
				clientId: process.env.REACT_APP_STRAVA_CLIENT_ID,
				clientSecret: process.env.REACT_APP_STRAVA_CLIENT_SECRET,
				code
			}
		}
	});
};
