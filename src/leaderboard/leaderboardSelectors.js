import { createSelector } from "reselect";
import { makeGetClubBySlug } from "../clubs/clubsSelectors";

const getLeaderboardEntries = state => state.entities.entries;
const getLeaderboards = state => state.entities.leaderboard;

const makeGetLeaderboardForClubId = () => {
	const getClubBySlug = makeGetClubBySlug();
	return createSelector(
		[getClubBySlug, getLeaderboards],
		(club, leaderboards) => {
			if (club && leaderboards) {
				return leaderboards[club.id];
			}

			return null;
		}
	);
};

export const makeGetEntriesForClubId = () => {
	const getLeaderboardForClubId = makeGetLeaderboardForClubId();
	return createSelector(
		[getLeaderboardForClubId, getLeaderboardEntries],
		(leaderboard, entries) => {
			if (leaderboard) {
				return leaderboard.entries.map(entry => entries[entry]);
			}

			return [];
		}
	);
};
