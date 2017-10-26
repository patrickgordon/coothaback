import React from "react";

import styles from "./EffortContent.css";

const EffortContent = ({ title, date }) => {
	return (
		<div className={styles.title}>
			<div style={{ textAlign: "center" }}>
				<h3 style={{ margin: "0px" }}>{title}</h3>
				<h5 style={{ margin: "12px 0px" }}>16 December 2016</h5>
			</div>
		</div>
	);
};

export default EffortContent;