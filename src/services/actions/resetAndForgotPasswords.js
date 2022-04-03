import { BURGER_API } from '../../utils/constants'
import { checkResponse } from "../../components/App/App";

export const POST_FORGOT_PASSWORD_SUCCESS = 'POST_FORGOT_PASSWORD_SUCCESS'
export const POST_FORGOT_PASSWORD_FAILED = 'POST_FORGOT_PASSWORD_FAILED'
export const CLEAR_STATE_FORGOT_PASSWORD = 'CLEAR_STATE_FORGOT_PASSWORD'

export function postForgotPassword(req) {
  // Воспользуемся первым аргументом из усилителя redux-thunk - dispatch
  return function(dispatch) {
    // Закидываем заказ на сервер
    fetch(`${BURGER_API}/password-reset`, { method: 'POST', headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: req })})
      .then((response) => checkResponse(response))
      .then((data) => {
        // В случае успешного получения данных вызываем экшен
        // Где передаём успех
        dispatch({
          type: POST_FORGOT_PASSWORD_SUCCESS,
        })
      })
      .catch((err) => {
        // Если что-то пошло не так, то вернём ошибку
        dispatch({
          type: POST_FORGOT_PASSWORD_FAILED,
          error: `При выполнении запроса произошла ошибка: ${err.statusText}`
        })
      })
  }
}