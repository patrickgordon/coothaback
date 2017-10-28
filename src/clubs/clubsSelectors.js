import { createSelector } from "reselect";

const getClubsKeys = state => state.clubs.keys;
const getClubs = state => state.entities && state.entities.clubs;
const getSlug = (state, ownProps) => ownProps.match && ownProps.match.params && ownProps.match.params.slug;

export const getMappedClubs = createSelector(
	[getClubsKeys, getClubs],
	(clubsKeys, clubs) => clubsKeys.map(key => clubs[key])
);

export const makeGetClubBySlug = () => createSelector(
	[getMappedClubs, getSlug],
	(clubs, slug) => clubs.find(club => club.url === slug)
);
