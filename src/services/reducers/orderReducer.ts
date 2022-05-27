import {
  CLEAR_ORDER_NUMBER,
  CLOSE_ORDER_MODAL,
  OPEN_ORDER_MODAL,
  POST_ORDER_FAILED,
  POST_ORDER_SUCCESS
} from '../actions/order'

import { TOrder } from '../../utils/types'

type TInitialOrder = {
  order: TOrder | {};
  orderError: string;
  isOrderModalVisible: boolean;
}

interface IPostOrderSuccess {
  readonly type: typeof POST_ORDER_SUCCESS;
  order: TOrder;
}

interface IPostOrderFailed {
  readonly type: typeof POST_ORDER_FAILED;
  error: string;
}

interface IClearOrderNumber {
  readonly type: typeof CLEAR_ORDER_NUMBER;
}

interface IOpenOrderModal {
  readonly type: typeof OPEN_ORDER_MODAL;
}

interface ICloseOrderModal {
  readonly type: typeof CLOSE_ORDER_MODAL;
}

type TOrderReducer = IPostOrderSuccess | IPostOrderFailed | IClearOrderNumber | IOpenOrderModal | ICloseOrderModal

const initialOrder: TInitialOrder = {
  order: {},
  orderError: '',
  isOrderModalVisible: false,
}

export const orderReducer = (state = initialOrder, action: TOrderReducer): TInitialOrder => {
  switch (action.type) {
    case POST_ORDER_SUCCESS: {
      return {
        ...state,
        order: action.order,
        orderError: '',
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
