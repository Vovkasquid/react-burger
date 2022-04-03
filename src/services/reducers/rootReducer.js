import { combineReducers } from 'redux'
import {
  receivedComponentsReducer,
  detailIngredientReducer,
  orderReducer,
  burgerConstructorsItemsReducer,
  resetAndForgotPasswordReducer, userReducer
} from "./reducers";

const rootReducer = combineReducers({
  receivedComponents: receivedComponentsReducer,
  detailIngredient: detailIngredientReducer,
  order: orderReducer,
  constructorItems: burgerConstructorsItemsReducer,
  resetAndForgotPassword: resetAndForgotPasswordReducer,
  user: userReducer,
})

export default rootReducer