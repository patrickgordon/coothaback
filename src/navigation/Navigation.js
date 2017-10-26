import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { getAuthenticatedAthlete, getIsAuthenticated } from "../authentication/authenticationSelectors";

import styles from "./Navigation.css";

const navItems = [
	{
		to: "/",
		text: "My Results"
	},
	{
		to: "/groups",
		text: "Groups"
	}
];

const Navigation = ({ isAuthenticated }) => {
	if (!isAuthenticated) { return null; }

	return (
		<div className={styles.root}>
			<ul className={styles.navbar}>
				{navItems.map(item => {
					return (
						<li key={`${item.to}${item.text}`} className={styles.navItem}>
							<NavLink exact to={item.to} activeClassName={styles.active} className={styles.navLink}>
								{item.text}
							</NavLink>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

const mapStateToProps = state => ({
	isAuthenticated: getIsAuthenticated(state),
	user: getAuthenticatedAthlete(state)
});

export default withRouter(connect(mapStateToProps)(Navigation));
