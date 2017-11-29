import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from './redux/configureStore';
import App from './App';

const testingStore = configureStore();

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={testingStore}>
      <App />
    </Provider>,
    div
  );
});
