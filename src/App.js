import React, { Component } from 'react';

import EffortsList from "./efforts/components/EffortsList";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import styles from './App.css';

class App extends Component {
	render() {
		return (
			<div className={styles.root}>
				<Header />

				<div className={styles.content}>
					<EffortsList />
				</div>

				<Footer />
			</div>
		);
	}
}

export default App;
