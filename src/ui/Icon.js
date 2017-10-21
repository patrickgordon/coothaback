import React from 'react';
import classNames from "classnames";

const Icon = (props) => {
	const {
		iconName,
		isSpin = false
	} = props;

	const classes = classNames(
		"fal",
		`fa-${iconName}`,
		{
			"fa-spin": isSpin
		}
	)

	return (
		<i className={classes}></i>
	);
};

export default Icon;