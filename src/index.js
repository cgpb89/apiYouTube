import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './components/App';
require('./style.scss');

ReactDOM.render(
    <div>
        <App />
    </div>,
    document.querySelector('#container')
);

