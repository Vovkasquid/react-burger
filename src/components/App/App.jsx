import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { getComponents } from '../../services/actions/receivedComponents'
import { useDispatch, useSelector } from 'react-redux'
import { SET_DETAIL_INGREDIENT, CLEAR_DETAIL_INGREDIENT } from '../../services/actions/detailIngredient'
import { postOrder, CLOSE_ORDER_MODAL } from '../../services/actions/order'
import MainPage from "../../pages/MainPage/MainPage";

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
        <Route exact path="/">
          <MainPage />
        </Route>
      </Switch>
    </BrowserRouter>


  )
}

export default App
