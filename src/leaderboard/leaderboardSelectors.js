import { createSelector } from "reselect";
import { makeGetClubBySlug } from "../clubs/clubsSelectors";

const getLeaderboardEntries = state => state.entities && state.entities.entries;
const getLeaderboards = state => state.entities && state.entities.leaderboard;
const getLeaderboardForFollowing = state => state.entities && state.entities.leaderboard && state.entities.leaderboard.following;

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

export const getEntriesForFollowers = createSelector(
	[getLeaderboardForFollowing, getLeaderboardEntries],
	(leaderboard, entries) => {
		if (leaderboard) {
			return leaderboard.entries.map(entry => entries[entry]);
		}

		return [];
	}
);