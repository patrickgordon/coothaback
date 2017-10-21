export const getIsAuthenticated = state => !!(state.authentication.accessToken);
const getAccessToken = state => state.authentication.accessToken;

export const getAuthenticatedAthlete = state => {
	const accessToken = getAccessToken(state);
	if (accessToken) {
		const authAthleteId = state.entities.authentication[accessToken].athlete;
		return state.entities.athletes[authAthleteId];
	}

	return {};
};
