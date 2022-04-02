import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import MainPage from '../../pages/MainPage/MainPage'
import AuthPage from '../../pages/AuthPage/AuthPage'
import ProfilePage from '../../pages/ProfilePage/ProfilePage'

 // Метод для проверки ответа
 export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  // Если условие не выполнено, то делаем промис с ошибкой
  return Promise.reject(res);
}

export const filterBun = (data) => {
  return data?.filter((item) => item.type === 'bun')
}

export const filterSauces = (data) => {
  return data?.filter((item) => item.type === 'sauce')
}

export const filterMainIngredients = (data) => {
  return data?.filter((item) => item.type === 'main')
}

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login">
          <AuthPage isLogin />
        </Route>
        <Route path="/register">
          <AuthPage isRegister />
        </Route>
        <Route path="/reset-password">
          <AuthPage />
        </Route>
        <Route path="/forgot-password">
          <AuthPage />
        </Route>
        <Route path="/profile">
          <ProfilePage />
        </Route>
        <Route exact path="/">
          <MainPage />
        </Route>
        <Route path="*">
          <Redirect to='/' />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
