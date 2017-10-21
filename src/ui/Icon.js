import React from "react";
import classNames from "classnames";

import styles from "./Icon.css";

const Icon = (props) => {
	const {
		iconName,
		isSpin = false,
		isFlush = false
	} = props;

	const classes = classNames(
		"fal",
		`fa-${iconName}`,
		styles.root,
		{
			"fa-spin": isSpin,
			[styles.isFlush]: isFlush
		}
	);

	return (
		<i className={classes}></i>
	);
};

export default Icon;