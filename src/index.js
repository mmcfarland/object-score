import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';

import App from './App.jsx';
import { mainReducer } from './reducers';
import './index.css';

const storeMaker = applyMiddleware(createLogger())(createStore);
const store = storeMaker(mainReducer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
