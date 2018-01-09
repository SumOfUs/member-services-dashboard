import { createStore } from 'redux';
import reducers from './reducers';

export const configureStore = () => {
  const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  if (module.hot) {
    module.hot.accept('./reducers', () =>
      store.replaceReducer(require('./reducers').default)
    );
  }
  return store;
};
