import React from "react";

import styles from "./Leaderboard.css";

const Leaderboard = ({ children }) => {
	return (
		<div className="col-12">
			<div className={styles.root}>
				{children}
			</div>
		</div>
	);
};

export default Leaderboard;