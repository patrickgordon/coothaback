import { camelizeKeys } from "humps";
import { normalize } from "normalizr";

export const CALL_API = "callAPI";
// TODO: Switch this based on node_env to https://www.strava.com/api/v3 ...
export const BASE_URL = "http://localhost:3001";

export const middleware = (middlewareArgs = {}) => store => next => action => {
	const apiAction = action[CALL_API];

	if (!apiAction) {
		return next(action);
	}

	const { 
		fetchFn,
		normalizeFn
	} = middlewareArgs;
	const { dispatch } = store;

	const { 
		types,
		endpoint,
		method,
		schema,
		// body,
	} = apiAction;

	const [requestType, successType, failureType] = types;
	const fullURL = `${BASE_URL}${endpoint}`;

	dispatch({ type: requestType });
	
	return fetchFn(fullURL, { 
		method,
	}).then(response => {
		return response.json().then(json => {
			const data = camelizeKeys(json);
			const normalizedData = normalizeFn(data, schema);

			dispatch({
				type: successType,
				payload: normalizedData
			});
		});
	}).catch(error => {
		return error.json().then(error => {
			dispatch({
				type: failureType,
				error
			});
		});
	});
};

const apiMiddleware = middleware({
	fetchFn: fetch,
	normalizeFn: normalize
});

export default apiMiddleware;