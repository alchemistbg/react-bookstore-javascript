// import dotenv from 'dotenv';

import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';

import App from './components/App/App';

// dotenv.config({
//     path: 'envs/.env_dev'
// });

ReactDOM.render(
    <App />,
    document.getElementById('root')
);