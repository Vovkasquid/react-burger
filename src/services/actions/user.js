import { BURGER_API } from '../../utils/constants'
import { checkResponse } from '../../components/App/App'

export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS'
export const REGISTER_FAILED = 'REGISTER_FAILED'
export const SET_USER = 'SET_USER'
export const CLEAR_USER = 'CLEAR_USER'
export const CLEAR_REGISTER_STATE = 'CLEAR_REGISTER_STATE'

export function registerUser(req) {
  // Воспользуемся первым аргументом из усилителя redux-thunk - dispatch
  return function(dispatch) {
    // Закидываем заказ на сервер
    fetch(`${BURGER_API}/auth/register`, { method: 'POST', headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req)})
      .then((response) => checkResponse(response))
      .then((data) => {
        // В случае успешного получения данных вызываем экшен
        // Где передаём успех
        dispatch({
          type: USER_REGISTER_SUCCESS,
        })
        dispatch({
          type: SET_USER,
          payload: data.user,
        })
        // записать в куки
      })
      .catch((err) => {
        // Если что-то пошло не так, то вернём ошибку
        dispatch({
          type: REGISTER_FAILED,
          error: `При выполнении запроса произошла ошибка: ${err.statusText}`
        })
      })
  }
}