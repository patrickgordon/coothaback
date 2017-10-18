import React from 'react';

import Button from "../ui/Button";
import styles from "./Header.css";

const Header = () => {
	const stravaLink = 'https://www.strava.com/oauth/authorize?client_id=15533&response_type=code&redirect_uri=http://localhost:3000/token_exchange&scope=view_private';
	return (
		<header className={styles.root}>
			<div className="grid-center">
				<div className="col">
					<div className={styles.title}>
						<h1>Yeah, but what's ya cootha back time?</h1>
					</div>
				</div>
			</div>

			<div className="grid-center">
				<div className="col">
					<Button href={stravaLink}>
							Connect to Strava
					</Button>
				</div>
			</div>
		</header>
	);
};

export default Header;