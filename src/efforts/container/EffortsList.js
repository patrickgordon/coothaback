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

	renderTopThreeEfforts = () => {
		const { efforts } = this.props;
		const topThreeEfforts = efforts.slice(0, 3);

		return topThreeEfforts.map((effort, index) => {
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
	}

	renderOthers = () => {
		const { efforts } = this.props;
		const others = efforts.slice(3);

		const cards = others.map((effort, index) => {
			const { movingTime, id, averageCadence, averageWatts, averageHeartrate, startDateLocal } = effort;

			const effortTimeReadable = formatTime(movingTime);
			const effortDateReadable = formatDate(startDateLocal);
			const content = (<EffortContent title={effortTimeReadable} date={effortDateReadable} />);
			const icons = (<EffortIcons watts={averageWatts} heartRate={averageHeartrate} cadence={averageCadence} />);

			return (
				<div key={id} className="col-4_xs-12_sm-6">
					<Card
						contentComponent={content}
						iconsComponent={icons}
					/>
				</div>
			);
		});

		return [
			<div key="otherAttempts" className="col-12">
				<h5 className={styles.breaker}>Other Attempts:</h5>
			</div>,
			cards
		];
	}

	render() {
		const { isAuthenticated, hasEfforts } = this.props;
		const banter = isAuthenticated ? "Couldn't find any efforts on Cootha." : "Connect with Strava first...";
		const stravaLink = `https://www.strava.com/oauth/authorize?client_id=${process.env.REACT_APP_STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_STRAVA_REDIRECT_URL}&scope=view_private`;

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

				{hasEfforts && this.renderTopThreeEfforts()}
				{hasEfforts && this.renderOthers()}
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