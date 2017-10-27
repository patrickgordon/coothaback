import { DEFAULT_KEY, generateCacheTTL } from "redux-cache";

import {
	FETCH_REQUEST,
	FETCH_SUCCESS
} from "./clubsActions";

const initialState = {
	[DEFAULT_KEY]: null,
	keys: []
};

export const clubsReducer = (state = initialState, action) => {
	switch (action.type) {
	case FETCH_SUCCESS:
		return {
			...state,
			[DEFAULT_KEY]: generateCacheTTL(),
			keys: action.payload.result
		};

	case FETCH_REQUEST:
	default:
		return state;
	}
};

export default clubsReducer;