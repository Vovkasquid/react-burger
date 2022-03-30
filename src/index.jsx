import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './components/App/App.jsx'
import reportWebVitals from './reportWebVitals'
import { compose, createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './services/reducers/rootReducer'
import thunk from 'redux-thunk'

// Настраиваем девтулзу
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

// Делаем расширение хранилища
const enhancer = composeEnhancers(applyMiddleware(thunk));

// Создаём хранилище
const store = createStore(rootReducer, enhancer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
