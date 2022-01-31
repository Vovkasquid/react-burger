import { combineReducers } from 'redux'
import {
  receivedComponentsReducer,
  detailIngredientReducer,
  orderReducer, burgerConstructorsItemsReducer
} from "./reducers";

const rootReducer = combineReducers({
  receivedComponents: receivedComponentsReducer,
  detailIngredient: detailIngredientReducer,
  order: orderReducer,
  constructorItems: burgerConstructorsItemsReducer,
})

export default rootReducer