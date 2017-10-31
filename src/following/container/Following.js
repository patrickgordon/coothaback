import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Leaderboard from "../../leaderboard/components/Leaderboard";
import { fetchFollowingLeaderboard as fetchFollowingLeaderboardAction } from "../../leaderboard/leaderboardActions";
import { getEntriesForFollowers } from "../../leaderboard/leaderboardSelectors";

class Following extends Component {
	componentDidMount() {
		const { actions: { fetchFollowingLeaderboard } } = this.props;

		fetchFollowingLeaderboard();
	}

	render() {
		const { entries } = this.props;
		const hasEntries = entries.length > 0;

		return (
			<div className="grid">
				{!hasEntries &&
				<div className="col">
					<h1>No entries</h1>
				</div>
				}

				{hasEntries &&
				<Leaderboard entries={entries} />
				}
			</div>
		);
	}
}

const makeMapStateToProps = () => {
	const mapStateToProps = (state, ownProps) => ({
		entries: getEntriesForFollowers(state)
	});

	return mapStateToProps;
};

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({ fetchFollowingLeaderboard: fetchFollowingLeaderboardAction }, dispatch)
});

const mapStateToProps = makeMapStateToProps();
export default connect(mapStateToProps, mapDispatchToProps)(Following);