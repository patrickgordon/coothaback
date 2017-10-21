import React from "react";
import { connect } from "react-redux";

import { getAuthenticatedAthlete } from "../authentication/authenticationSelectors";

import styles from "./Header.css";

const Header = () => {
	return (
		<header className={styles.root}>
			<div className="grid-center-noBottom">
				<div className="col">
					<div className={styles.title}>
						<h1>Yeah, but what's ya cootha back time?</h1>
					</div>
				</div>
			</div>
		</header>
	);
};

const mapStateToProps = state => ({
	user: getAuthenticatedAthlete(state)
});

export default connect(mapStateToProps)(Header);