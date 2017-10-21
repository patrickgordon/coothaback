import React, { Component } from "react";
import {
	BrowserRouter,
	Route,
} from "react-router-dom";

import EffortsList from "./efforts/container/EffortsList";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import TokenExchange from "./authentication/container/TokenExchange";

import styles from "./App.css";

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div className={styles.root}>
					<Header />

					<div className={styles.content}>
						<Route path="/" exact component={EffortsList} />
						<Route path="/token_exchange" exact component={TokenExchange} />
					</div>

					<Footer />
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
