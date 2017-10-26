import { createSelector } from "reselect";

const getGroupsKeys = state => state.groups.keys;
const getGroups = state => state.entities && state.entities.groups;

export const getMappedGroups = createSelector(
	[getGroupsKeys, getGroups],
	(groupsKeys, groups) => groupsKeys.map(key => groups[key])
);