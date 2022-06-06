import { BURGER_API } from '../../utils/constants'
import { checkResponse } from '../../utils/utils'
import { AppThunk } from '../../index'

export const POST_FORGOT_PASSWORD_SUCCESS = 'POST_FORGOT_PASSWORD_SUCCESS'
export const POST_FORGOT_PASSWORD_FAILED = 'POST_FORGOT_PASSWORD_FAILED'
export const CLEAR_STATE_FORGOT_PASSWORD = 'CLEAR_STATE_FORGOT_PASSWORD'
export const POST_RESET_PASSWORD_SUCCESS = 'POST_RESET_PASSWORD_SUCCESS'
export const POST_RESET_PASSWORD_FAILED = 'POST_RESET_PASSWORD_FAILED'
export const CLEAR_STATE_RESET_PASSWORD = 'CLEAR_STATE_RESET_PASSWORD'

export const postForgotPassword: AppThunk = (req) => {
  // Воспользуемся первым аргументом из усилителя redux-thunk - dispatch
  return function(dispatch) {
    // Очищаем ошибки перед запросом
    dispatch({ type: CLEAR_STATE_FORGOT_PASSWORD })
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

export const postResetPassword:AppThunk = (req) => {
  // Воспользуемся первым аргументом из усилителя redux-thunk - dispatch
  return function(dispatch) {
    dispatch({ type: CLEAR_STATE_RESET_PASSWORD })
    // Закидываем заказ на сервер
    fetch(`${BURGER_API}/password-reset/reset`, { method: 'POST', headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req)})
      .then((response) => checkResponse(response))
      .then((data) => {
        // В случае успешного получения данных вызываем экшен
        // Где передаём успех
        dispatch({
          type: POST_RESET_PASSWORD_SUCCESS,
        })
      })
      .catch((err) => {
        // Если что-то пошло не так, то вернём ошибку
        dispatch({
          type: POST_RESET_PASSWORD_FAILED,
          error: `При выполнении запроса произошла ошибка: ${err.statusText}`
        })
      })
  }
}
