import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

function render(Component = App) {
  ReactDOM.render(
    <Router>
      <Component />
    </Router>,
    document.getElementById('root')
  );
}

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    render(NextApp);
  });
}

render();

registerServiceWorker();
