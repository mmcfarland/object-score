import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-material-design/dist/css/bootstrap-material-design.css';

import App from './App.jsx';
import { mainReducer } from './reducers';
import './index.css';

/*
import jQuery from 'jquery';
window.jQuery = jQuery;
import 'bootstrap-material-design/dist/js/material';
jQuery.material.init();
*/

const middleware = []
if (process.env.NODE_ENV === 'development') {
    middleware.push(createLogger());
}

const storeMaker = applyMiddleware(...middleware)(createStore);
const store = storeMaker(mainReducer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
