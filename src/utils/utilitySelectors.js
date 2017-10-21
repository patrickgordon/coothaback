import { createSelector } from "reselect";
import { parse } from "qs";

export const getSearch = (state, ownProps) => (ownProps.location && ownProps.location.search.substr(1)) || "";

const parseQueryString = qs => parse(qs);

export const makeGetQueryParams = (parseQueryStringFn = parseQueryString) => createSelector(
	[getSearch],
	search => {
		return {
			...parseQueryStringFn(search)
		};
	}
);