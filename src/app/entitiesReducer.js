const entitiesReducer = (state = {}, action) => {
	const entities = action && action.payload && action.payload.entities
	
	if (!entities) {
		return state;
	}

	return {
		...state,
		...entities
	}
}

export default entitiesReducer;