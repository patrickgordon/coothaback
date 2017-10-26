import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Card from "../../ui/Card";
import { fetchGroups as fetchGroupsAction } from "../groupsActions";
import { getMappedGroups } from "../groupsSelectors";

export class GroupsList extends Component {
	componentDidMount() {
		const { actions: { fetchGroups } } = this.props;
		fetchGroups();
	}

	renderGroups = () => {
		const { groups } = this.props;
		return groups.map(group => {
			const { id, name } = group;

			const content = (
				<div>{name}</div>
			);

			return (
				<div key={id}>
					<Card contentComponent={content} />
				</div>
			);
		});
	}

	render() {
		const { hasGroups } = this.props;

		return (
			<div>
				{!hasGroups &&
				<h1 data-id="noGroupsHeader" style={{ margin: 0 }}>Hey, no friends! Guess what? You got no friends.</h1>
				}
				{hasGroups && this.renderGroups()}
			</div>
		);
	}
}

export const makeMapStateToProps = (args = {}) => {
	const {	getMappedGroupsFn = getMappedGroups } = args;

	const mapStateToProps = state => ({
		hasGroups: !!(state.groups.keys.length > 0),
		groups: getMappedGroupsFn(state)
	});

	return mapStateToProps;
};

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({ fetchGroups: fetchGroupsAction }, dispatch)
});

const mapStateToProps = makeMapStateToProps();

export default connect(mapStateToProps, mapDispatchToProps)(GroupsList);
