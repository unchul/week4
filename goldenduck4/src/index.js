import React from 'react';
import ReactDOM from 'react-dom';
import App from './shared/App';
import './index.css';

// store 선언해주기
import store from './redux/configureStore';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
