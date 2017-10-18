import React from 'react';
import classNames from "classnames";

import styles from "./Button.css";

const Button = ({ href, children }) => {
	const Component = href ? "a" : "button";

	const classes = classNames(
		[styles.root],
		[styles.primary]
	);

	return (
		<Component href={href} className={classes}>
			{children}
		</Component>
	);
};

export default Button;