import {
  GET_COMPONENTS_SUCCESS,
  GET_COMPONENTS_FAILED,
  SET_FILTERED_BUN,
  SET_FILTERED_SAUCES,
  SET_FILTERED_MAIN_INGREDIENTS
} from '../actions/receivedComponents'

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

const initialBurgerConstructorIngredients = {
  ingredients: [],
  choosenBun: {},
}

export const burgerConstructorsItemsReducer = (state = initialBurgerConstructorIngredients, action) => {
  switch (action.type) {
    case ADD_CONSTRUCTOR_ITEM: {
      return {
        ...state,
        ingredients: [...state.ingredients, action.ingredient],
      }
    }
    case SET_CHOOSEN_BUN: {
      return {
        ...state,
        choosenBun: action.bun,
      }
    }
    //  TO DO
    /* case DELETE_CONSTRUCTOR_ITEM: {
      return {
        ...state,

      }
    } */
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