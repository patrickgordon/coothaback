import React from "react";

import formatDate from "../../utils/formatDate";
import formatTime from "../../utils/formatTime";

import styles from "./LeaderboardItem.css";

const LeaderboardItem = ({ entry }) => {
	const effortTimeReadable = formatTime(entry.movingTime);
	const effortDateReadable = formatDate(entry.startDateLocal);

	return (
		<div className={styles.root}>
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