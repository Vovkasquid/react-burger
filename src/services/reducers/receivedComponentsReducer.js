import {
  DEC_COUNTER_INGREDIENT,
  GET_COMPONENTS_FAILED,
  GET_COMPONENTS_SUCCESS, INC_COUNTER_INGREDIENT,
  SET_FILTERED_BUN, SET_FILTERED_MAIN_INGREDIENTS,
  SET_FILTERED_SAUCES
} from '../actions/receivedComponents'

const initialReceivedComponents = {
  receivedComponents: [],
  getComponentsError: '',
  bun: '',
  sauces: '',
  mainIngredients: '',
}

export const receivedComponentsReducer = (state = initialReceivedComponents, action) => {
  switch(action.type) {
    case GET_COMPONENTS_SUCCESS: {
      // Если запрос прошёл успешно, то заполним стейт и затрём ошибку
      // Иначе выставим ошибку
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
        bun: action.filtered,
      }
    }
    case SET_FILTERED_SAUCES: {
      return {
        ...state,
        sauces: action.filtered,
      }
    }
    case SET_FILTERED_MAIN_INGREDIENTS: {
      return {
        ...state,
        mainIngredients: action.filtered,
      }
    }
    case INC_COUNTER_INGREDIENT: {
      let indexOfIngredient
      const newState = {...state}
      if (action.item.type === 'bun') {
        indexOfIngredient = state.bun.findIndex(item => item._id === action.item._id)
        // Булок может быть ли 2, либо 0
        if (newState.bun[indexOfIngredient].counter === 0) {
          // Cначала занулим все остальные булки, а потом выставим нужную
          newState.bun.forEach(item => item.counter = 0)
          newState.bun[indexOfIngredient].counter += 2;
        } // В зависимости от типа ищем элемент в нужном массиве
      } else if (action.item.type === 'sauce') {
        indexOfIngredient = state.sauces.findIndex(item => item._id === action.item._id)
        newState.sauces[indexOfIngredient].counter += 1
      } else {
        indexOfIngredient = state.mainIngredients.findIndex(item => item._id === action.item._id)
        newState.mainIngredients[indexOfIngredient].counter += 1
      }

      return newState
    }
    case DEC_COUNTER_INGREDIENT: {
      let indexOfIngredient
      const newState = {...state}
      // Булки тут вообще не трогаем
      if (action.item.type === 'sauce') {
        indexOfIngredient = state.sauces.findIndex(item => item._id === action.item._id)
        newState.sauces[indexOfIngredient].counter -= 1
      } else {
        indexOfIngredient = state.mainIngredients.findIndex(item => item._id === action.item._id)
        newState.mainIngredients[indexOfIngredient].counter -= 1
      }
      return newState
    }
    default: {
      return state
    }
  }
}
