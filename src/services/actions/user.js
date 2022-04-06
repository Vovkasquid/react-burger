import { BURGER_API } from '../../utils/constants'
import { checkResponse } from '../../components/App/App'
import { deleteCookie, getCookie, setCookie } from "../../utils/coockies";
import { fetchWithRefresh } from "../../utils/utils";

export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS'
export const REGISTER_FAILED = 'REGISTER_FAILED'
export const SET_USER = 'SET_USER'
export const CLEAR_USER = 'CLEAR_USER'
export const CLEAR_REGISTER_STATE = 'CLEAR_REGISTER_STATE'
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
export const CLEAR_LOGIN_STATE = 'CLEAR_LOGIN_STATE'
export const LOGIN_FAILED = 'LOGIN_FAILED'
export const CLEAR_EXIT_STATE = 'CLEAR_EXIT_STATE'
export const USER_EXIT_SUCCESS = 'USER_EXIT_SUCCESS'
export const DELETE_USER = 'DELETE_USER'
export const EXIT_FAILED = 'EXIT_FAILED'
export const CLEAR_GET_STATE = 'CLEAR_GET_STATE'
export const USER_GET_SUCCESS = 'USER_GET_SUCCESS'
export const GET_FAILED = 'GET_FAILED'
export const CLEAR_PATCH_STATE = 'CLEAR_PATCH_STATE'
export const USER_PATCH_SUCCESS = 'USER_PATCH_SUCCESS'
export const PATCH_FAILED = 'PATCH_FAILED'

export function registerUser(req) {
  // Воспользуемся первым аргументом из усилителя redux-thunk - dispatch
  return function(dispatch) {
    // Перед запросом очищаем ошибки
    dispatch({ type: CLEAR_REGISTER_STATE })
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

export function loginUser(req) {
  // Воспользуемся первым аргументом из усилителя redux-thunk - dispatch
  return function(dispatch) {
    // Перед запросом очищаем ошибки
    dispatch({ type: CLEAR_LOGIN_STATE })
    // Закидываем заказ на сервер
    fetch(`${BURGER_API}/auth/login`, { method: 'POST', headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req)})
      .then((response) => checkResponse(response))
      .then((data) => {
        // В случае успешного получения данных вызываем экшен
        // Где передаём успех
        dispatch({
          type: USER_LOGIN_SUCCESS,
        })
        dispatch({
          type: SET_USER,
          payload: data.user,
        })
        // записать в куки оба токена
        setCookie('token',data.accessToken.split('Bearer ')[1])
        setCookie('refresh_token',data.refreshToken)
      })
      .catch((err) => {
        // Если что-то пошло не так, то вернём ошибку
        dispatch({
          type: LOGIN_FAILED,
          error: `При выполнении запроса произошла ошибка: ${err.statusText}`
        })
      })
  }
}

export function exitUser() {
  // Воспользуемся первым аргументом из усилителя redux-thunk - dispatch
  return function(dispatch) {
    // Перед запросом очищаем ошибки
    dispatch({ type: CLEAR_EXIT_STATE })
    fetch(`${BURGER_API}/auth/logout`, { method: 'POST', headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${getCookie('token')}`,
      },
      body: JSON.stringify({ token: getCookie('refresh_token') })})
      .then((response) => checkResponse(response))
      .then((data) => {
        // В случае успешного получения данных вызываем экшен
        // Где передаём успех и удаляем юзера
        dispatch({
          type: USER_EXIT_SUCCESS,
        })
        dispatch({
          type: DELETE_USER,
        })
        // удаляем обе куки
        deleteCookie('token')
        deleteCookie('refresh_token')
      })
      .catch((err) => {
        // Если что-то пошло не так, то вернём ошибку
        dispatch({
          type: EXIT_FAILED,
          error: `При выполнении запроса произошла ошибка: ${err.statusText}`
        })
      })
  }
}

export function getUser() {
  // Воспользуемся первым аргументом из усилителя redux-thunk - dispatch
  return function(dispatch) {
    // Перед запросом очищаем ошибки
    dispatch({ type: CLEAR_GET_STATE })
    // Закидываем заказ на сервер
    fetchWithRefresh(`${BURGER_API}/auth/user`, { method: 'GET', headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${getCookie('token')}`,
      }, })
      .then((data) => {
        // В случае успешного получения данных вызываем экшен
        // Где передаём успех и сохраняем юзера
        console.log(data)
        dispatch({
          type: USER_GET_SUCCESS,
        })
        dispatch({
          type: SET_USER,
          payload: data.user,
        })
      })
      .catch((err) => {
        console.log('феаско')
        // Если что-то пошло не так, то вернём ошибку
        dispatch({
          type: GET_FAILED,
          error: `При выполнении запроса произошла ошибка: ${err.statusText}`
        })
      })
  }
}

export function patchUser(req) {
  // Воспользуемся первым аргументом из усилителя redux-thunk - dispatch
  return function(dispatch) {
    // Перед запросом очищаем ошибки
    dispatch({ type: CLEAR_PATCH_STATE })
    // Закидываем заказ на сервер
    fetchWithRefresh(`${BURGER_API}/auth/user`, { method: 'PATCH', headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${getCookie('token')}`,
      },
      body: JSON.stringify(req)})
      .then((response) => checkResponse(response))
      .then((data) => {
        // В случае успешного получения данных вызываем экшен
        // Где передаём успех и сохраняем юзера
        console.log(data)
        dispatch({
          type: USER_PATCH_SUCCESS,
        })
        dispatch({
          type: SET_USER,
          payload: data.user,
        })
      })
      .catch((err) => {
        console.log(err)
        // Если что-то пошло не так, то вернём ошибку
        dispatch({
          type: PATCH_FAILED,
          error: `При выполнении запроса произошла ошибка: ${err.statusText}`
        })
      })
  }
}