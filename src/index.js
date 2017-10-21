import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";

import App from "./App";
import BigLoader from "./layout/BigLoader";
import configureStore from "./app/configureStore";
import registerServiceWorker from "./registerServiceWorker";

import "./index.css";
import "gridlex/docs/gridlex.min.css";

const store = configureStore();

class AppProvider extends React.Component {
	constructor() {
		super();
		this.state = { rehydrated: false };
	}

	componentWillMount() {
		persistStore(store, {}, () => {
			this.setState({ rehydrated: true });
		});
	}

	render() {
		if(!this.state.rehydrated) {
			return <BigLoader />;
		}

		return (
			<Provider store={store}>
				<App />
			</Provider>
		);
	}
}

ReactDOM.render(
	<AppProvider />,
	document.getElementById("root")
);
registerServiceWorker();
