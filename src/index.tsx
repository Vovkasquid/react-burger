import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './components/App/App'
import reportWebVitals from './reportWebVitals'
import { compose, createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './services/reducers/rootReducer'
import thunk from 'redux-thunk'
import { TBurgerConstructorsItemsReducer } from './services/reducers/burgerConstructorIngredientsReducer'
import { TDetailIngredientReducers } from './services/reducers/detailIngredientReducer'
import { TOrderReducer } from './services/reducers/orderReducer'
import { TReceivedComponentsReducer } from './services/reducers/receivedComponentsReducer'
import { TResetAndForgotPasswordReducer } from './services/reducers/resetAndForgotPassword'
import { TUserReducer } from './services/reducers/userReducer'

type TApplicationActions = TBurgerConstructorsItemsReducer |
  TDetailIngredientReducers |
  TOrderReducer |
  TReceivedComponentsReducer |
  TResetAndForgotPasswordReducer |
  TUserReducer

export type RootState = ReturnType<typeof store.getState>

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

// Настраиваем девтулзу
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    // @ts-ignore
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose

// Делаем расширение хранилища
const enhancer = composeEnhancers(applyMiddleware(thunk))

// Создаём хранилище
const store = createStore(rootReducer, enhancer)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
