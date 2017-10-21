import React from "react";

import Icon from "../ui/Icon";

import styles from "./BigLoader.css";

const BigLoader = () => {
	return (
		<div className={styles.root}>
			<h1><Icon iconName="cog" isSpin /> Loading...</h1>
		</div>
	);
};

export default BigLoader;