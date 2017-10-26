import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Button from "../../ui/Button";
import Card from "../../ui/Card";
import EffortContent from "../components/EffortContent";
import EffortHeader from "../components/EffortHeader";
import EffortIcons from "../components/EffortIcons";
import formatDate from "../../utils/formatDate";
import formatTime from "../../utils/formatTime";
import { fetchEfforts } from "../effortsActions";
import { getIsAuthenticated } from "../../authentication/authenticationSelectors";
import { getMappedEfforts } from "../effortsSelectors";

import styles from "./EffortsList.css";

const renderTopThreeEfforts = (topThree) => {
	return topThree.map((effort, index) => {
		const { movingTime, id, averageCadence, averageWatts, averageHeartrate, startDateLocal } = effort;

		const effortTimeReadable = formatTime(movingTime);
		const effortDateReadable = formatDate(startDateLocal);
		const header = (<EffortHeader prNumber={index} />);
		const content = (<EffortContent title={effortTimeReadable} date={effortDateReadable} />);
		const icons = (<EffortIcons watts={averageWatts} heartRate={averageHeartrate} cadence={averageCadence} />);

		return (
			<div key={id} className="col-4_xs-12_sm-6">
				<Card
					headerComponent={header}
					contentComponent={content}
					iconsComponent={icons}
				/>
			</div>
		);
	});
};

export class EffortsList extends Component {
	componentDidMount() {
		const {
			isAuthenticated,
			actions: { fetchEfforts }
		} = this.props;

		if (isAuthenticated) {
			fetchEfforts();
		}
	}

	render() {
		const { isAuthenticated, hasEfforts, efforts } = this.props;
		const banter = isAuthenticated ? "Couldn't find any efforts on Cootha." : "Connect with Strava first...";
		const stravaLink = `https://www.strava.com/oauth/authorize?client_id=${process.env.REACT_APP_STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_STRAVA_REDIRECT_URL}&scope=view_private`;

		// TODO: add tests
		let topThree = [];
		// let others = [];

		if (hasEfforts) {
			topThree = efforts.slice(0, 3);
			// others = efforts.slice(3);
		}

		return (
			<div className="grid">
				{!hasEfforts &&
				<div className="col-12">
					<h1 data-id="noEffortsHeader" className={styles.noEfforts}>{banter}</h1>
				</div>
				}

				{!isAuthenticated &&
					<div className="col-12">
						<Button href={stravaLink}>
							Connect to Strava
						</Button>
					</div>
				}

				{hasEfforts && renderTopThreeEfforts(topThree)}
			</div>
		);
	}
}

export const makeMapStateToProps = (args = {}) => {
	const {
		getIsAuthenticatedFn = getIsAuthenticated,
		getMappedEffortsFn = getMappedEfforts
	} = args;

	const mapStateToProps = state => ({
		isAuthenticated: getIsAuthenticatedFn(state),
		hasEfforts: !!(state.efforts.keys.length > 0),
		efforts: getMappedEffortsFn(state)
	});

	return mapStateToProps;
};

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({ fetchEfforts }, dispatch)
});

const mapStateToProps = makeMapStateToProps();
export default connect(mapStateToProps, mapDispatchToProps)(EffortsList);