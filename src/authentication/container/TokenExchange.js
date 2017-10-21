import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { authorize as authorizeAction } from "../authenticationActions";

import Icon from "../../ui/Icon";

class TokenExchange extends Component {
	componentDidMount() {
		// TODO: Filter query string param to get "code";
		const { match, actions: { authorize } } = this.props;
		authorize("fake code");
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

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({ authorize: authorizeAction }, dispatch)
});

export default connect(undefined, mapDispatchToProps)(TokenExchange);
