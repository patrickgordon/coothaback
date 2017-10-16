import React from 'react';
import ReactDOM from 'react-dom';
import 'gridlex/docs/gridlex.min.css'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';	

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
