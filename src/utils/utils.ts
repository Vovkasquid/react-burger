// Метод для проверки ответа
import { getCookie, setCookie } from './coockies'
import { BURGER_API } from './constants'
import { IApiResponse, TFetch, TFilterIngredient } from "./types";

export const filterBun: TFilterIngredient = (data) => {
  return data?.filter((item) => item.type === 'bun')
}

export const filterSauces: TFilterIngredient = (data) => {
  return data?.filter((item) => item.type === 'sauce')
}

export const filterMainIngredients: TFilterIngredient = (data) => {
  return data?.filter((item) => item.type === 'main')
}

export function checkResponse(res: IApiResponse) {
  if (res.ok) {
    return res.json()
  }
  // Если условие не выполнено, то делаем промис с ошибкой
  return Promise.reject(res)
}

export const fetchWithRefresh:TFetch = (url, options) => {
  return fetch(url, options)
    .then(res => checkResponse(res))
    .catch(async err => {
      if (+err.status === 403) {
        // Обновляем токен
        await fetch(`${BURGER_API}/auth/token`, { method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${getCookie('token')}`, },
          body: JSON.stringify({ token: getCookie('refresh_token') })})
          .then((response) => checkResponse(response))
          .then(data => {
            // записать в куки оба токена
            setCookie('token', data.accessToken.split('Bearer ')[1])
            setCookie('refresh_token', data.refreshToken)
          })
          .catch(err => new Error(err))
        // Делаем обновление токена в заголовках
        options.headers.authorization = `Bearer ${getCookie('token')}`
        // Делаем изначальный запрос после успешного обновления токена
        const res = await fetch(url, options)
        return checkResponse(res)
      } else {
        return Promise.reject(err)
      }
    })
}
