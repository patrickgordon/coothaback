import React from "react";
import classNames from "classnames";

import Icon from "./Icon";
import IconWithText from "./IconWithText";
import IconWrapped from "./IconWrapped";

import styles from "./Card.css";

const CardHeader = ({ prNumber }) => {
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

const CardIcons = ({ watts, heartRate, cadence }) => {
	if (!watts && !heartRate && !cadence) { return null; }

	const roundedWatts = watts && Math.round(watts);
	const roundedHeartRate = heartRate && Math.round(heartRate);
	const roundedCadence = cadence && Math.round(cadence);

	return (
		<div className={styles.icons}>
			{roundedWatts &&
			<div>
				<IconWrapped>
					<Icon iconName="bolt" />
				</IconWrapped>
				{roundedWatts}
			</div>
			}
			{roundedHeartRate &&
			<div>
				<IconWrapped>
					<Icon iconName="heartbeat" />
				</IconWrapped>
				{roundedHeartRate}
			</div>
			}
			{roundedCadence &&
			<div>
				<IconWrapped>
					<Icon iconName="repeat" />
				</IconWrapped>
				{roundedCadence}
			</div>
			}
		</div>
	);
};

const Card = ({	title, prNumber, ...others }) => {
	return (
		<div className={styles.root}>
			<CardHeader prNumber={prNumber} />
			<div className={styles.title}>
				<div style={{ textAlign: "center" }}>
					<h3 style={{ margin: "0px" }}>{title}</h3>
					<h5 style={{ margin: "12px 0px" }}>16 December 2016</h5>
				</div>
			</div>
			<CardIcons {...others} />
		</div>
	);
};

export default Card;