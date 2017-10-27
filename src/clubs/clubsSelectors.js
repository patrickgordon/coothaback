import { createSelector } from "reselect";

const getClubsKeys = state => state.clubs.keys;
const getClubs = state => state.entities && state.entities.clubs;

export const getMappedClubs = createSelector(
	[getClubsKeys, getClubs],
	(clubsKeys, clubs) => clubsKeys.map(key => clubs[key])
);