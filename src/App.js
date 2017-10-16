import React, { Component } from 'react';

import Button from "./UI/Button";
import styles from './App.css';

class App extends Component {
	render() {
		return (
			<div className={styles.root}>
				<header className={styles.header}>
					<div className="grid-center">
						<div className="col-sm-6">
							<div className={styles.title}>
								<h1>Yeah, but what's ya cootha back time?</h1>
							</div>
						</div>
					</div>

					<div className="grid-center">
						<div className="col-sm-6">
							<Button>
								Connect to Strava
							</Button>
						</div>
					</div>
				</header>

				<div className={styles.content}>
					<div className="grid">
						<div className="col">
							Cards go here, of course.
						</div>
						<div className="col">
							Cards go here, of course.
						</div>
					</div>
				</div>

				<footer className={styles.footer}>
					<div className="grid-center">
						<div className="col-sm-6">
							Made by <a href="//patrick-gordon.com">Patrick Gordon</a>.
						</div>
					</div>
				</footer>
			</div>
		);
	}
}

export default App;
