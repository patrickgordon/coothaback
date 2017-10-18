import { camelizeKeys } from "humps";

export const CALL_API = "callAPI";
export const BASE_URL = "http://localhost:3001";

export const middleware = (middlewareArgs = {}) => store => next => action => {
	const apiAction = action[CALL_API];

	if (!apiAction) {
		return next(action);
	}

	const { dispatch } = store;
	const { fetchFn } = middlewareArgs;

	const { 
		types,
		endpoint,
		method,
		// body,
	} = apiAction;

	const [requestType, successType, failureType] = types;
	const fullURL = `${BASE_URL}${endpoint}`;

	dispatch({ type: requestType })
	
	return fetchFn(fullURL, { 
		method,
	}).then(response => {
		return response.json().then(json => {
			const result = camelizeKeys(json);

			dispatch({
				type: successType,
				result
			});
		});
	}).catch(error => {
		console.log(error);
		// TODO: finish error handling
	});
};

const apiMiddleware = middleware({
	fetchFn: fetch
});

export default apiMiddleware;