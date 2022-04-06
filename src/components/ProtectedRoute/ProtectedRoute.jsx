import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from "../../services/actions/user";

export function ProtectedRoute({ children, ...rest }) {
  const dispatch = useDispatch()
  const userState = useSelector(store => store.user)

  const init = () => {
    dispatch(getUser())
  }

  React.useEffect(() => {
    init()
  }, [])

  return (
    <Route
      {...rest}
      // Получим текущий маршрут, с которого произойдёт переадресация
      // для неавторизованного пользователя
      render={({ location }) =>
        userState.name ? (
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