import { combineReducers } from 'redux'
import {
  receivedComponentsReducer,
  detailIngredientReducer,
  orderReducer
} from './reducers'

const rootReducer = combineReducers({
  receivedComponents: receivedComponentsReducer,
  detailIngredient: detailIngredientReducer,
  order: orderReducer,
})

export default rootReducer