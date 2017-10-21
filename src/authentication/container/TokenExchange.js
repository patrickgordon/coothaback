import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { makeGetQueryParams } from "../../utils/utilitySelectors";
import { authorize as authorizeAction } from "../authenticationActions";

import Icon from "../../ui/Icon";

export class TokenExchange extends Component {
	componentDidMount() {
		// TODO: Filter query string param to get "code";
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
				Please wait while we finishing your authentication...
			</h1>
		);
	}
}

export const makeMapStateToProps = (makeGetQueryParamsFn = makeGetQueryParams) => {
	const getQueryParams = makeGetQueryParamsFn();

	const mapStateToProps = (state, ownProps)=> ({
		isAuthenticated: !!(state.authentication && state.authentication.accessToken),
		queryParams: getQueryParams(state, ownProps)
	});

	return mapStateToProps;
};

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({ authorize: authorizeAction }, dispatch)
});

const mapStateToProps = makeMapStateToProps();
export default connect(mapStateToProps, mapDispatchToProps)(TokenExchange);
