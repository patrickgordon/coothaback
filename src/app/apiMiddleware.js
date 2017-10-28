import { camelizeKeys, decamelizeKeys } from "humps";
import { normalize } from "normalizr";

export const CALL_API = "callAPI";
export const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const middleware = (middlewareArgs = {}) => store => next => action => {
	const apiAction = action[CALL_API];

	if (!apiAction) {
		return next(action);
	}

	const {
		fetchFn,
		normalizeFn
	} = middlewareArgs;

	const { dispatch, getState } = store;

	const {
		types,
		endpoint,
		method,
		schema,
		body,
		meta = {}
	} = apiAction;

	const [requestType, successType, failureType] = types;
	const fullURL = `${BASE_URL}${endpoint}`;

	dispatch({ type: requestType });

	const accessToken = getState().authentication.accessToken;
	const headers = new Headers({
		"Content-Type": "application/json"
	});

	if (accessToken) {
		headers.append("Authorization", `Bearer ${accessToken}`);
	}

	const config = {
		method,
		headers,
		body: method === "POST" ? JSON.stringify(decamelizeKeys(body)) : null,
		mode: "cors"
	};

	return fetchFn(fullURL, config).then(response => {
		if (response.ok) {
			return response.json().then(json => {
				const { args = {} } = meta;

				const data = {
					...camelizeKeys(json),
					...args
				};

				const normalizedData = normalizeFn(data, schema);

				dispatch({
					type: successType,
					payload: normalizedData
				});
			});
		}

		return Promise.reject(response);
	}).catch(error => {
		if (error instanceof Error) {
			console.log("error: ", error);
			return Promise.resolve();
		}

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