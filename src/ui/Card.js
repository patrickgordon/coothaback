import React from "react";
import { Link } from "react-router-dom";

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

const Card = (props) => {
	const {
		linkTo,
		contentComponent,
		headerComponent,
		iconsComponent
	} = props;

	const Component = linkTo ? Link : "div";
	const linkProps = linkTo ? { to: linkTo } : {};

	return (
		<div className={styles.root}>
			<Component className={styles.link} {...linkProps}>
				<CardHeader>
					{headerComponent}
				</CardHeader>
				<CardContent>
					{contentComponent}
				</CardContent>
				<CardIcons>
					{iconsComponent}
				</CardIcons>
			</Component>
		</div>
	);
};

export default Card;