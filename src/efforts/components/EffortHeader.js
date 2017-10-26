import React from "react";
import classNames from "classnames";

import Icon from "../../ui/Icon";
import IconWithText from "../../ui/IconWithText";

import styles from "./EffortHeader.css";

const EffortHeader = ({ prNumber }) => {
	if (typeof prNumber === "undefined") { return null; }

	const colours = [styles.goldIcon, styles.silverIcon, styles.bronzeIcon];
	const displayNumber = prNumber + 1;

	const classes = classNames(
		styles.header,
		colours[prNumber]
	);

	return (
		<div className={classes}>
			<IconWithText text={displayNumber}>
				<Icon iconName="trophy" />
			</IconWithText>
		</div>
	);
};

export default EffortHeader;