import React from "react";

import styles from "./Card.css";

const CardHeader = ({ children }) => {
	if (!children) { return null; };

	return (
		<div className={styles.header}>
			{children}
		</div>
	);
};

const CardIcons = ({ children }) => {
	if (!children) { return null; };

	return (
		<div className={styles.icons}>
			{children}
		</div>
	);
};

const CardContent = ({ children }) => {
	if (!children) { return null; };

	return (
		<div className={styles.content}>
			{children}
		</div>
	);
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