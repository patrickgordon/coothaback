import React from "react";

import styles from "./Footer.css";

const Footer = () => {
	return (
		<footer className={styles.root}>
			<div className="grid">
				<div className="col">
					<span role="img" aria-label="bike emoji">🚲 </span>
					Made by <a href="//patrick-gordon.com">Patrick Gordon</a>
					<span role="img" aria-label="bike emoji"> 🚲</span>
				</div>
			</div>
		</footer>
	);
};

export default Footer;