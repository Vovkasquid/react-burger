import { combineReducers } from 'redux'
import { receivedComponentsReducer } from './receivedComponentsReducer'
import { detailIngredientReducer } from './detailIngredientReducer'
import { orderReducer } from './orderReducer'
import { burgerConstructorsItemsReducer } from './burgerConstructorIngredientsReducer'
import { resetAndForgotPasswordReducer } from './resetAndForgotPassword'
import { userReducer } from './userReducer'

const rootReducer = combineReducers({
  receivedComponents: receivedComponentsReducer,
  detailIngredient: detailIngredientReducer,
  order: orderReducer,
  constructorItems: burgerConstructorsItemsReducer,
  resetAndForgotPassword: resetAndForgotPasswordReducer,
  user: userReducer,
})

export default rootReducer