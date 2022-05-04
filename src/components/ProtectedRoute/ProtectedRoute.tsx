import React, { FC } from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'
import { RootStateOrAny, useSelector } from 'react-redux'
import { getCookie } from '../../utils/coockies'
import { TUserState } from '../../utils/types'

export const ProtectedRoute: FC<RouteProps> = ({ children, path, ...rest }) => {
  const userState = useSelector((store:RootStateOrAny):TUserState => store.user)
  return (
    <Route
      path={path}
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
