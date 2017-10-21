import React from "react";

import styles from "./Card.css";

const Card = ({ title, pillContent }) => {
	return (
		<div className={styles.root}>
			<div className={styles.header}>
				<div className={styles.overlay}>
					{pillContent &&
					<span className={styles.pill}>{pillContent}</span>
					}
				</div>
			</div>
			<div className={styles.title}>
				<h4>{title}</h4>
			</div>
			<div className={styles.actions}>
			</div>
		</div>
	);
};

export default Card;