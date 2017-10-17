import { 
	FETCH_REQUEST,
	FETCH_SUCCESS
} from "./effortsActions";

const initialState = {
	results: []
}

export const effortsReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_SUCCESS:
			return {
				...state,
				results: action.result
			}
		
		case FETCH_REQUEST:
		default:
			return state;
	}
}

export default effortsReducer;