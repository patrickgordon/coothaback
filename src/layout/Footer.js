import React from "react";
import { Link } from "react-router-dom";

import styles from "./Footer.css";

const Footer = () => {
	return (
		<footer className={styles.root}>
			<div className="grid-noGutter">
				<div className="col">
					<div className={styles.content}>
						<div>
							<span role="img" aria-label="bike emoji">🚲 </span>
							<Link to="/about">What's this nonsense?</Link>
						</div>
						<div>
							Made by <a href="//patrick-gordon.com">Patrick Gordon</a>
							<span role="img" aria-label="bike emoji"> 🚲</span>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;