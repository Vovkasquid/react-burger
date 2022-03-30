import { BURGER_API } from '../../utils/constants'
import { checkResponse } from '../../components/App/App'

export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS'
export const POST_ORDER_FAILED = 'POST_ORDER_FAILED'
export const CLEAR_ORDER_NUMBER = 'CLEAR_ORDER_NUMBER'
export const OPEN_ORDER_MODAL = 'OPEN_ORDER_MODAL'
export const CLOSE_ORDER_MODAL = 'CLOSE_ORDER_MODAL'

export function postOrder(req) {
  // Воспользуемся первым аргументом из усилителя redux-thunk - dispatch
  return function(dispatch) {
    // Закидываем заказ на сервер
    fetch(`${BURGER_API}/orders`, { method: 'POST', headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ingredients: req })})
      .then((response) => checkResponse(response))
      .then((data) => {
        // В случае успешного получения данных вызываем экшен
        // для записи полученных данных в хранилище
        dispatch({
          type: POST_ORDER_SUCCESS,
          order: data
        })
        // Открываем модалку после успешного запроса
        dispatch({
          type: OPEN_ORDER_MODAL,
        })
      })
      .catch((err) => {
        // Если что-то пошло не так, то вернём ошибку
        dispatch({
            type: POST_ORDER_FAILED,
            error: `При выполнении запроса произошла ошибка: ${err.statusText}`
        })
      })
  }
}
