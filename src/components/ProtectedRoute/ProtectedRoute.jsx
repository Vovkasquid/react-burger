import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getCookie } from '../../utils/coockies'

export function ProtectedRoute({ children, ...rest }) {
  const userState = useSelector(store => store.user)
  return (
    <Route
      {...rest}
      // Получим текущий маршрут, с которого произойдёт переадресация
      // для неавторизованного пользователя
      render={({ location }) =>
        getCookie('token') || userState?.name ? (
          children
        ) : (
          <Redirect
            // Передадим в пропс to не строку, а объект.
            to={{
              // Маршрут, на который произойдёт переадресация
              pathname: '/login',
              // В from сохраним текущий маршрут
              state: { from: location }
            }}
          />
        )
      }
    />
  )
}