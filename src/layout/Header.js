import React from "react";

import styles from "./Header.css";

const Header = () => {
	return (
		<header className={styles.root}>
			<div className={styles.title}>
				<h1>Yeah, but what's ya cootha back time?</h1>
			</div>
		</header>
	);
};

export default Header;