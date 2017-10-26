import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { fetchGroups as fetchGroupsAction } from "../groupsActions";
import { getMappedGroups } from "../groupsSelectors";

export class GroupsList extends Component {
	componentDidMount() {
		const { actions: { fetchGroups } } = this.props;
		fetchGroups();
	}

	render() {
		const { groups } = this.props;
		return (
			<ul>
				{groups.map(group => (<li>{group.name}</li>))}
			</ul>
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
