import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from '../shared/App';

// redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from '../reducers';

const store = createStore(reducers, applyMiddleware(thunk));
//const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


const Root = () => (
  <Provider store={ store }>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

export default Root;