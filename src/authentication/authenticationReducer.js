import { DEFAULT_KEY, generateCacheTTL } from "redux-cache";

import {
	FETCH_REQUEST,
	FETCH_SUCCESS
} from "./authenticationActions";

const initialState = {
	[DEFAULT_KEY]: null,
	accessToken: null
};

export const authenticationReducer = (state = initialState, action) => {
	switch (action.type) {
	case FETCH_SUCCESS:
		return {
			...state,
			[DEFAULT_KEY]: generateCacheTTL(),
			accessToken: action.payload.result
		};

	case FETCH_REQUEST:
	default:
		return state;
	}
};

export default authenticationReducer;