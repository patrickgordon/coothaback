import React, { Component } from "react";
import { connect } from "react-redux";

import { makeGetClubBySlug } from "../clubsSelectors";

class Club extends Component {
	render() {
		return (
			<div>Club</div>
		);
	}
}

const makeMapStateToProps = () => {
	const getClubBySlug = makeGetClubBySlug();

	const mapStateToProps = (state, ownProps) => ({
		club: getClubBySlug(state, ownProps)
	});

	return mapStateToProps;
};

const mapStateToProps = makeMapStateToProps();

export default connect(mapStateToProps)(Club);
