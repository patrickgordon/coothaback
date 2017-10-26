import React from "react";

import styles from "./Card.css";

const CardHeader = ({ children }) => {
	if (!children) { return null; };

	return children;
};

const CardIcons = ({ children }) => {
	if (!children) { return null; };

	return children;
};

const CardContent = ({ children }) => {
	if (!children) { return null; };

	return children;
};

const Card = ({ contentComponent, headerComponent, iconsComponent }) => {
	return (
		<div className={styles.root}>
			<CardHeader>
				{headerComponent}
			</CardHeader>
			<CardContent>
				{contentComponent}
			</CardContent>
			<CardIcons>
				{iconsComponent}
			</CardIcons>
		</div>
	);
};

export default Card;