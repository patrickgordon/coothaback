import React, { Component } from "react";
import {
	BrowserRouter,
	Switch,
	Route
} from "react-router-dom";

import About from "./about/About";
import EffortsList from "./efforts/container/EffortsList";
import Footer from "./layout/Footer";
import Club from "./clubs/container/Club";
import ClubsList from "./clubs/container/ClubsList";
import Header from "./layout/Header";
import Navigation from "./navigation/Navigation";
import TokenExchange from "./authentication/container/TokenExchange";
import protectedRoute from "./authentication/protectedRoute";

import styles from "./App.css";

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div className={styles.root}>
					<Header />
					<Navigation />

					<div className={styles.content}>
						<Switch>
							<Route path="/" exact component={EffortsList} />
							<Route path="/clubs" exact component={protectedRoute(ClubsList)} />
							<Route path="/clubs/:slug" component={protectedRoute(Club)} />
							<Route path="/about" exact component={About} />
							<Route path="/token_exchange" exact component={TokenExchange} />
						</Switch>
					</div>

					<Footer />
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
