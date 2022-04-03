import { combineReducers } from 'redux'
import {
  receivedComponentsReducer,
  detailIngredientReducer,
  orderReducer,
  burgerConstructorsItemsReducer,
  resetAndForgotPasswordReducer,
} from './reducers'

const rootReducer = combineReducers({
  receivedComponents: receivedComponentsReducer,
  detailIngredient: detailIngredientReducer,
  order: orderReducer,
  constructorItems: burgerConstructorsItemsReducer,
  resetAndForgotPassword: resetAndForgotPasswordReducer,
})

export default rootReducer