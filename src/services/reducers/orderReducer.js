import {
  CLEAR_ORDER_NUMBER,
  CLOSE_ORDER_MODAL,
  OPEN_ORDER_MODAL,
  POST_ORDER_FAILED,
  POST_ORDER_SUCCESS
} from '../actions/order'

const initialOrder = {
  order: {},
  orderError: '',
  isOrderModalVisible: false,
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