import React from "react";

import styles from "./ClubHeader.css";

const ClubHeader = ({ imageSrc }) => {
	console.log("imageSrc: ", imageSrc);
	return (
		<div className={styles.root}>
			<img className={styles.profile} src={imageSrc} alt="club profile" />
		</div>
	);
};

export default ClubHeader;