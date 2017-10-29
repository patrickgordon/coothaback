import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Leaderboard from "../../leaderboard/components/Leaderboard";
import LeaderboardItem from "../../leaderboard/components/LeaderboardItem";
import { fetchClubLeaderboard as fetchClubLeaderboardAction } from "../../leaderboard/leaderboardActions";
import { makeGetClubBySlug } from "../clubsSelectors";
import { makeGetEntriesForClubId } from "../../leaderboard/leaderboardSelectors";

class Club extends Component {
	componentDidMount() {
		const {
			club,
			actions: { fetchClubLeaderboard	}
		} = this.props;

		const clubId = club && club.id;
		if (clubId) {
			fetchClubLeaderboard(clubId);
		}

	}

	render() {
		const { entries, club } = this.props;
		const hasEntries = entries.length > 0;
		return (
			<div className="grid">
				{!hasEntries &&
				<div className="col">
					<h1>No entries for club</h1>
				</div>
				}

				{hasEntries &&
				<div className="col-12">
					<h1 style={{ margin: 0 }}>{club.name}</h1>
				</div>
				}

				{hasEntries &&
				<Leaderboard>
					{entries.map(entry => <LeaderboardItem key={entry.effortId} entry={entry} />)}
				</Leaderboard>
				}
			</div>
		);
	}
}

const makeMapStateToProps = () => {
	const getClubBySlug = makeGetClubBySlug();
	const getEntriesForClubId = makeGetEntriesForClubId();

	const mapStateToProps = (state, ownProps) => ({
		club: getClubBySlug(state, ownProps),
		entries: getEntriesForClubId(state, ownProps)
	});

	return mapStateToProps;
};

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({ fetchClubLeaderboard: fetchClubLeaderboardAction }, dispatch)
});

const mapStateToProps = makeMapStateToProps();
export default connect(mapStateToProps, mapDispatchToProps)(Club);
