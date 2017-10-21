import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { makeGetQueryParams } from "../../utils/utilitySelectors";
import { getIsAuthenticated } from "../authenticationSelectors";
import { authorize as authorizeAction } from "../authenticationActions";

import Icon from "../../ui/Icon";

export class TokenExchange extends Component {
	componentDidMount() {
		const {
			actions: { authorize },
			isAuthenticated,
			history: { push },
			queryParams: { code },
		} = this.props;

		if (isAuthenticated) {
			push("/");
		}

		authorize(code);
	}

	componentWillReceiveProps(nextProps) {
		const { history: { push } } = this.props;
		const { isAuthenticated } = nextProps;
		if (isAuthenticated) {
			push("/");
		}
	}

	render() {
		return (
			<h1>
				<Icon iconName="cog" isSpin />
				Just doing some housekeeping; Will be done in a jiffy...
			</h1>
		);
	}
}

export const makeMapStateToProps = (args = {}) => {
	const {
		getIsAuthenticatedFn = getIsAuthenticated,
		makeGetQueryParamsFn = makeGetQueryParams
	} = args;

	const getQueryParams = makeGetQueryParamsFn();

	const mapStateToProps = (state, ownProps)=> ({
		isAuthenticated: getIsAuthenticatedFn(state),
		queryParams: getQueryParams(state, ownProps)
	});

	return mapStateToProps;
};

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({ authorize: authorizeAction }, dispatch)
});

const mapStateToProps = makeMapStateToProps();
export default connect(mapStateToProps, mapDispatchToProps)(TokenExchange);
