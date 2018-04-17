import React from 'react';
import ReactDOM from 'react-dom';

import 'normalize.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './app/assets/fonts/iconfont/iconfont.css';
import './app/assets/styles/reset.css';
import App from './app/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
