import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Button from "../../ui/Button";
import Card from "../../ui/Card";
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

	render() {
		const { isAuthenticated, hasEfforts, efforts } = this.props;
		const banter = isAuthenticated ? "No efforts on Cootha, ya choom." : "Uhh, maybe try to connect with Strava first?";
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

				{hasEfforts && efforts.map(effort => {
					const effortTimeReadable = formatTime(effort.movingTime);
					return (
						<div key={effort.id} className="col-4_xs-12_sm-6">
							<Card
								pillContent="Personal Best"
								title={effortTimeReadable}
							/>
						</div>
					);
				})}
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