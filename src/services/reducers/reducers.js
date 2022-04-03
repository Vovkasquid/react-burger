import {
  GET_COMPONENTS_SUCCESS,
  GET_COMPONENTS_FAILED,
  SET_FILTERED_BUN,
  SET_FILTERED_SAUCES,
  SET_FILTERED_MAIN_INGREDIENTS,
  INC_COUNTER_INGREDIENT,
  DEC_COUNTER_INGREDIENT, SET_SORTED_ARRAY
} from "../actions/receivedComponents";

import {
  SET_DETAIL_INGREDIENT,
  CLEAR_DETAIL_INGREDIENT,
} from '../actions/detailIngredient'

import {
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILED,
  CLEAR_ORDER_NUMBER,
  OPEN_ORDER_MODAL,
  CLOSE_ORDER_MODAL,
} from '../actions/order'

import {
  ADD_CONSTRUCTOR_ITEM,
  DELETE_CONSTRUCTOR_ITEM,
  SET_CHOOSEN_BUN,
} from '../actions/burgerConstructorIngredients'

import {
  POST_FORGOT_PASSWORD_SUCCESS,
  POST_FORGOT_PASSWORD_FAILED, CLEAR_STATE_FORGOT_PASSWORD
} from "../actions/resetAndForgotPasswords";

const initialReceivedComponents = {
  receivedComponents: [],
  getComponentsError: '',
  bun: '',
  sauces: '',
  mainIngredients: '',
}

const initialDetailIngredient = {
  ingredient: {},
}

const initialOrder = {
  order: {},
  orderError: '',
  isOrderModalVisible: false,
}

const initialForgotAndResetPassword = {
  isSuccessForgotPasswordRequest: false,
  forgotPasswordRequestError: '',
}

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

export const detailIngredientReducer = (state = initialDetailIngredient, action) => {
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
export const resetAndForgotPasswordReducer = (state = initialForgotAndResetPassword, action) => {
  switch (action.type) {
    case POST_FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        isSuccessForgotPasswordRequest: true,
        forgotPasswordRequestError: ''
      }
    }
    case POST_FORGOT_PASSWORD_FAILED: {
      return {
        ...state,
        isSuccessForgotPasswordRequest: false,
        forgotPasswordRequestError: action.error,
      }
    }
    case CLEAR_STATE_FORGOT_PASSWORD: {
      return {
        ...state,
        isSuccessForgotPasswordRequest: false,
        forgotPasswordRequestError: '',
      }
    }
    default:
      return state
  }
}

export const orderReducer = (state = initialOrder, action) => {
  switch (action.type) {
    case POST_ORDER_SUCCESS: {
      return {
        ...state,
        order: action.order,
        error: '',
      }
    }
    case POST_ORDER_FAILED: {
      return {
        ...state,
        orderError: action.error,
      }
    }
    case CLEAR_ORDER_NUMBER: {
      return {
        ...state,
        order: {},
      }
    }
    case OPEN_ORDER_MODAL: {
      return {
        ...state,
        isOrderModalVisible: true,
      }
    }
    case CLOSE_ORDER_MODAL: {
      return {
        ...state,
        isOrderModalVisible: false,
      }
    }
    default:
      return state
  }
}