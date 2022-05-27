import { CLEAR_DETAIL_INGREDIENT, SET_DETAIL_INGREDIENT } from '../actions/detailIngredient'
import { TIngredient } from '../../utils/types'

type TInitialDetailIngredient = {
  ingredient: TIngredient | {};
}

interface IClearDetailIngredient {
  readonly type: typeof CLEAR_DETAIL_INGREDIENT;
}

interface  ISetDetailIngredient {
  readonly type: typeof SET_DETAIL_INGREDIENT;
  ingredient: TIngredient;
}

type TDetailIngredientReducers = IClearDetailIngredient | ISetDetailIngredient

const initialDetailIngredient: TInitialDetailIngredient = {
  ingredient: {},
}

export const detailIngredientReducer = (state = initialDetailIngredient, action: TDetailIngredientReducers): TInitialDetailIngredient => {
  switch (action.type) {
    case CLEAR_DETAIL_INGREDIENT: {
      return {
        ...state,
        ingredient: {}
      }
    }
    case SET_DETAIL_INGREDIENT: {
      return {
        ...state,
        ingredient: action.ingredient,
      }
    }
    default:
      return state
  }
}
