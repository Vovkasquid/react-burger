// Метод для проверки ответа
import { getCookie, setCookie } from "./coockies";
import { BURGER_API } from "./constants";

export function checkResponse(res) {
  if (res.ok) {
    return res.json()
  }
  // Если условие не выполнено, то делаем промис с ошибкой
  return Promise.reject(res)
}

export const fetchWithRefresh = (url, options = {}) => {
  console.log('custom fetch')
  console.log(options)
  return fetch(url, options)
    .then(res => checkResponse(res))
    .catch(async err => {
      console.log('err =', err)
      if (+err.status === 403) {
        // Обновляем токен
        console.log('Обновляем')
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
