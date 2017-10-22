import merge from "lodash/merge";

const entitiesReducer = (state = {}, action) => {
	const entities = action && action.payload && action.payload.entities;

	if (!entities) {
		return state;
	}

	return merge({}, state, entities);
};

export default entitiesReducer;
