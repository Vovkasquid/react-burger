import { combineReducers } from 'redux'
import {
  receivedComponentsReducer,
  currentIngredientsReducer,
  detailIngredientReducer,
  orderReducer
} from './reducers'

const rootReducer = combineReducers({
  receivedComponents: receivedComponentsReducer,
  currentIngredients: currentIngredientsReducer,
  detailIngredient: detailIngredientReducer,
  order: orderReducer,
})

export default rootReducer