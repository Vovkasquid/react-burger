import React from 'react'
import { BrowserRouter, Redirect, Route, Switch, useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute'
import MainPage from '../../pages/MainPage/MainPage'
import AuthPage from '../../pages/AuthPage/AuthPage'
import ProfilePage from '../../pages/ProfilePage/ProfilePage'
import IngredientDetails from '../IngredientDetails/IngredientDetails'
import { CLEAR_DETAIL_INGREDIENT } from "../../services/actions/detailIngredient";
import Modal from "../Modal/Modal";
import { MODAL_INGREDIENT_TITLE } from "../../utils/constants";

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

  function ModalSwitch() {
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch()
    const background = location.state && location.state.background;

    const handleCloseIngredientModal = () => {
      dispatch({ type: CLEAR_DETAIL_INGREDIENT })
      // Возвращаемся к предыдущему пути при закрытии модалки
      history.goBack()
    }

    return (
      <>
        <Switch location={background || location}>
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
          <Route path='/ingredients/:ingredientId' exact>
            <IngredientDetails />
          </Route>
          <ProtectedRoute path="/profile">
            <ProfilePage />
          </ProtectedRoute>
          <Route exact path="/">
            <MainPage />
          </Route>
          <Route path="*">
            <Redirect to='/' />
          </Route>
        </Switch>


        {background && (
          <Route
            path='/ingredients/:ingredientId'
            children={
              <Modal
                closePopup={handleCloseIngredientModal}
                title={MODAL_INGREDIENT_TITLE}
              >
                <IngredientDetails />
              </Modal>
            }
          />
        )}
      </>
    );
  }

function App() {

  return (
    <BrowserRouter>
      <ModalSwitch />
    </BrowserRouter>
  )
}

export default App
