import 'materialize-css/dist/css/materialize.min.css'
import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

import configureUserStore from './store/user-store';
import configureTaskStore from './store/taskType-store';

configureUserStore();
configureTaskStore();

ReactDOM.render(
        <App />,
    document.querySelector('#root'));