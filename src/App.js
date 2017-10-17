import React, { Component } from 'react';

import Button from "./UI/Button";
import EffortsList from "./efforts/components/EffortsList";
import styles from './App.css';

class App extends Component {
	render() {
		return (
			<div className={styles.root}>
				<header className={styles.header}>
					<div className="grid-center">
						<div className="col">
							<div className={styles.title}>
								<h1>Yeah, but what's ya cootha back time?</h1>
							</div>
						</div>
					</div>

					<div className="grid-center">
						<div className="col">
							<Button>
								Connect to Strava
							</Button>
						</div>
					</div>
				</header>

				<div className={styles.content}>
					<EffortsList />
				</div>

				<footer className={styles.footer}>
					<div className="grid">
						<div className="col">
							<span role="img" aria-label="bike emoji">🚲 </span>
							Made by <a href="//patrick-gordon.com">Patrick Gordon</a>
							<span role="img" aria-label="bike emoji"> 🚲</span>
						</div>
					</div>
				</footer>
			</div>
		);
	}
}

export default App;
