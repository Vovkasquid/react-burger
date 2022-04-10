import {
  ADD_CONSTRUCTOR_ITEM,
  DELETE_CONSTRUCTOR_ITEM,
  SET_CHOOSEN_BUN,
  SET_SORTED_ARRAY,
} from '../actions/burgerConstructorIngredients'

const initialBurgerConstructorIngredients = {
  ingredients: [],
  choosenBun: null,
}

export const burgerConstructorsItemsReducer = (state = initialBurgerConstructorIngredients, action) => {
  switch (action.type) {
    case ADD_CONSTRUCTOR_ITEM: {
      // засовываем key в элемент
      const newItem = {...action.ingredient}
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
      const indexIngredient = newState.ingredients.findIndex(item => item._id === action.item._id)
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