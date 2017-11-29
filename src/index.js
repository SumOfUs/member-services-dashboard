import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { configureStore } from './redux/configureStore';

const store = configureStore();

function render(Component = App) {
  ReactDOM.render(
    <Provider store={store}>
      <Component />
    </Provider>,
    document.getElementById('root')
  );
}

if (module.hot) {
  module.hot.accept('./App', () => render(require('./App').default));
}

render(App);
registerServiceWorker();
