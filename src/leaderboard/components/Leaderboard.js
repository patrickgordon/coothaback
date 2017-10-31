import React from "react";
import { connect } from "react-redux";

import LeaderboardItem from "./LeaderboardItem";
import { getAuthenticatedAthlete } from "../../authentication/authenticationSelectors";

import styles from "./Leaderboard.css";

const Leaderboard = ({ entries, athlete }) => {
	const { id: athleteId } = athlete;

	return (
		<div className="col-12">
			<div className={styles.root}>
				{entries.map(entry => {
					const isAthlete = athleteId === entry.athleteId;

					return (
						<LeaderboardItem
							key={entry.effortId}
							isAthlete={isAthlete}
							entry={entry}
						/>
					);
				})}
			</div>
		</div>
	);
};

const makeMapStateToProps = () => {
	const mapStateToProps = (state, ownProps) => ({
		athlete: getAuthenticatedAthlete(state)
	});

	return mapStateToProps;
};

const mapStateToProps = makeMapStateToProps();
export default connect(mapStateToProps)(Leaderboard);