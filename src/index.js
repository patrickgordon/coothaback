import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import configureStore from './app/configureStore';
import registerServiceWorker from './registerServiceWorker';	
import './index.css';
import 'gridlex/docs/gridlex.min.css'

const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>, 
	document.getElementById('root')
);
registerServiceWorker();
