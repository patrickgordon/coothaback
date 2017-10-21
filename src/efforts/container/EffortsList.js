import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Card from "../../ui/Card";
import formatTime from "../../utils/formatTime";
import { fetchEfforts } from "../effortsActions";
import { getMappedEfforts } from "../effortsSelectors";

import styles from "./EffortsList.css";

export class EffortsList extends Component {
	componentDidMount() {
		const { actions: { fetchEfforts } } = this.props;
		fetchEfforts();
	}

	render() {
		const { hasEfforts, efforts } = this.props;

		return (
			<div className="grid">
				{!hasEfforts &&
				<h1 data-id="noEffortsHeader" className={styles.noEfforts}>No efforts on Cootha, ya pleb.</h1>
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
				);})}
			</div>
		);
	}
}

export const makeMapStateToProps = (getMappedEffortsFn = getMappedEfforts) => {
	const mapStateToProps = state => ({
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