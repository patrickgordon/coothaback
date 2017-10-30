import React from "react";
import classNames from "classnames";

import formatDate from "../../utils/formatDate";
import formatTime from "../../utils/formatTime";

import styles from "./LeaderboardItem.css";

const LeaderboardItem = ({ entry, isAthlete }) => {
	const effortTimeReadable = formatTime(entry.movingTime);
	const effortDateReadable = formatDate(entry.startDateLocal);

	const classes = classNames(
		[styles.root],
		{
			[styles.isAthlete]: isAthlete
		}
	);

	return (
		<div className={classes}>
			<div className={styles.rank}>
				#{entry.rank}
			</div>
			<div className={styles.details}>
				<div className={styles.name}>
					{entry.athleteName}
				</div>
				<div className={styles.time}>
					{effortTimeReadable}
				</div>
				<div className={styles.date}>
					{effortDateReadable}
				</div>
			</div>
		</div>
	);
};

export default LeaderboardItem;