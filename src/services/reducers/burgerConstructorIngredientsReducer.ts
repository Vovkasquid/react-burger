import {
  ADD_CONSTRUCTOR_ITEM,
  DELETE_CONSTRUCTOR_ITEM,
  SET_CHOOSEN_BUN,
  SET_SORTED_ARRAY,
} from '../actions/burgerConstructorIngredients'
import { TIngredient } from "../../utils/types";

type TInitialBurgerConstructorIngredients = {
  ingredients: ReadonlyArray<TIngredient> | null;
  choosenBun: TIngredient | null;
}

const initialBurgerConstructorIngredients = {
  ingredients: [],
  choosenBun: null,
}

interface IAddConstructorItemAction {
  readonly type: typeof ADD_CONSTRUCTOR_ITEM;
  readonly ingredient: TIngredient;
  readonly key: string;
}

interface IDeleteConstructorItemAction {
  readonly type: typeof DELETE_CONSTRUCTOR_ITEM;
  readonly item: TIngredient;
}

interface ISetChoosenBunAction {
  readonly type: typeof SET_CHOOSEN_BUN;
  readonly bun: TIngredient;
}

interface ISetSortedArrayAction {
  readonly type: typeof SET_SORTED_ARRAY;
  readonly sortedArray: Array<TIngredient>;
}

type TBurgerConstructorsItemsReducer = | IAddConstructorItemAction | IDeleteConstructorItemAction | ISetChoosenBunAction | ISetSortedArrayAction

export const burgerConstructorsItemsReducer = (state = initialBurgerConstructorIngredients, action:TBurgerConstructorsItemsReducer):TInitialBurgerConstructorIngredients => {
  switch (action.type) {
    case ADD_CONSTRUCTOR_ITEM: {
      // засовываем key в элемент
      const newItem:TIngredient = {...action.ingredient}
      newItem.key = action.key
      return {
        ...state,
        ingredients: [...state.ingredients, newItem],
      }
    }
    case SET_CHOOSEN_BUN: {
      return {
        ...state,
        choosenBun: action.bun,
      }
    }
    case DELETE_CONSTRUCTOR_ITEM: {
      const newState = {...state}
      const indexIngredient = newState.ingredients.findIndex((item: TIngredient )=> item._id === action.item._id)
      if (indexIngredient !== -1) {
        // Удаляем первый найденный элемент
        newState.ingredients.splice(indexIngredient,1)
      }
      return {
        ...state,
        ingredients: [...newState.ingredients]
      }
    }
    case SET_SORTED_ARRAY: {
      return {
        ...state,
        ingredients: [...action.sortedArray]
      }
    }
    default: {
      return state
    }
  }
}
