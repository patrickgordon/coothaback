import { camelizeKeys } from "humps";

export const FETCH_REQUEST = "Efforts.FETCH_REQUEST";
export const FETCH_SUCCESS = "Efforts.FETCH_SUCCESS";
export const FETCH_FAILURE = "Efforts.FETCH_FAILURE";

export const fetchEfforts = () => (dispatch) => {
	dispatch({
		type: FETCH_REQUEST
	});

	fetch("http://localhost:3001/efforts").then((response) => {
		response.json().then(json => {
			const result = camelizeKeys(json);
			dispatch({
				type: FETCH_SUCCESS,
				result
			})
		});
	}).catch(error => {
		dispatch({
			type: FETCH_FAILURE,
			error
		})
	})
}
