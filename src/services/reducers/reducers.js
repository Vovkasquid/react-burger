import {
  GET_COMPONENTS_SUCCESS,
  GET_COMPONENTS_FAILED,
  SET_FILTERED_BUN,
  SET_FILTERED_SAUCES,
  SET_FILTERED_MAIN_INGREDIENTS
} from "../actions/receivedComponents"

const initialReceivedComponents = {
  receivedComponents: [],
  getComponentsError: '',
  filteredBun: '',
  filteredSauces: '',
  filteredMainIngredients: '',
}

const initialCurrentIngredients = {
  currentBun: [],
  currentIngredients: [],
}

const initialDetailIngredient = {
  ingredient: [],
}

const initialOrder = {
  order: [],
}

export const receivedComponentsReducer = (state = initialReceivedComponents, action) => {
  switch(action.type) {
    case GET_COMPONENTS_SUCCESS: {
      // Если запрос прошёл успешно, то заполним стейт и затрём ошибку
      // Иначе выставим ошибку
      console.log(action.components)
      return {
        ...state,
        receivedComponents: action.components,
        getComponentsError: '',
      }
    }
    case GET_COMPONENTS_FAILED: {
      return {
        ...state,
        getComponentsError: action.error,
      }
    }
    // Обработаем экшены записи отфильтрованных элементов
    case SET_FILTERED_BUN: {
      return {
        ...state,
        filteredBun: action.filtered,
      }
    }
    case SET_FILTERED_SAUCES: {
      return {
        ...state,
        filteredSauces: action.filtered,
      }
    }
    case SET_FILTERED_MAIN_INGREDIENTS: {
      return {
        ...state,
        filteredMainIngredients: action.filtered,
      }
    }
    default: {
      return state
    }
  }
}

export const currentIngredientsReducer = (state = initialCurrentIngredients, action) => {
  return 0
}

export const detailIngredientReducer = (state = initialDetailIngredient, action) => {
  return 0
}

export const orderReducer = (state = initialOrder, action) => {
  return 0
}