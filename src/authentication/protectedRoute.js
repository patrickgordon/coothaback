import React, { Component } from "react";
import { connect } from "react-redux";

import { getIsAuthenticated } from "./authenticationSelectors.js";

const protectedRoute = (WrappedComponent) => {
	class ProtectedComponent extends Component {
		componentDidMount() {
			const { isAuthenticated, history: { push } } = this.props;

			if (!isAuthenticated) {
				push("/");
			}
		}

		render() {
			return <WrappedComponent {...this.props} />;
		}
	};
	ProtectedComponent.displayName = `ProtectedComponent(${WrappedComponent.displayName || WrappedComponent.name || "Component"};`;

	const mapStateToProps = state => ({
		isAuthenticated: getIsAuthenticated(state)
	});

	return connect(mapStateToProps)(ProtectedComponent);
};

export default protectedRoute;