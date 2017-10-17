import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Card from "../../UI/Card";
import styles from "./EffortsList.css";
import { fetchEfforts } from "../effortsActions";

class EffortsList extends Component {
	componentDidMount() {
		const { hasEfforts, actions: { fetchEfforts } } = this.props;

		if (!hasEfforts) {
			fetchEfforts();
		}
	}

	render() {
		const { hasEfforts, efforts } = this.props;
		
		// TODO: Move to own helper.
		const formatTime = (secondsToConvert) => {
			var hours = Math.floor(secondsToConvert / 3600);
			var minutes = Math.floor((secondsToConvert - (hours * 3600)) / 60);
			var seconds = secondsToConvert - (hours * 3600) - (minutes * 60);
		
			if (minutes < 10) { minutes = "0"+minutes; }
			if (seconds < 10) { seconds = "0"+seconds; }
			return `${minutes} minutes ${seconds} seconds`;
		}


		return (
			<div className="grid">
				{!hasEfforts && 
				<h1 className={styles.noEfforts}>No efforts on Cootha, ya pleb.</h1>
				}
				{hasEfforts && efforts.map(effort => {
					const effortTimeReadable = formatTime(effort.movingTime);
					return (
					<div key={effort.id} className="col-4_xs-12_sm-6">
						<Card title={effortTimeReadable} />
					</div>
				)})}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	hasEfforts: !!(state.efforts.results.length > 0),
	efforts: state.efforts.results
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({ fetchEfforts }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(EffortsList);