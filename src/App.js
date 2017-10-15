import React, { Component } from 'react';

import Button from "./UI/Button";
import logo from './logo.svg';
import styles from './App.css';

class App extends Component {
	render() {
		return (
			<div className={styles.root}>
				<header className={styles.header}>
					<img src={logo} className={styles.logo} alt="logo" />
					<h1 className={styles.title}>Welcome to React</h1>
				</header>
				<p className={styles.intro}>
					To get started, edit <code>src/App.js</code> and save to reload.
				</p>

				<div className="container">
					<div className="row center-xs">
						<div className="col-xs-6">
							<Button>
								Im a button
							</Button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
