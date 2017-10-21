import { createSelector } from "reselect";

const getEffortKeys = state => state.efforts.keys;
const getEfforts = state => state.entities && state.entities.efforts;

export const getMappedEfforts = createSelector(
	[getEffortKeys, getEfforts],
	(effortKeys, efforts) => effortKeys.map(key => efforts[key])
);