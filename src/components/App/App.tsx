import React, { FC } from "react";
import { BrowserRouter, Redirect, Route, Switch, useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute'
import MainPage from '../../pages/MainPage/MainPage'
import ProfilePage from '../../pages/ProfilePage/ProfilePage'
import IngredientDetails from '../IngredientDetails/IngredientDetails'
import { CLEAR_DETAIL_INGREDIENT } from '../../services/actions/detailIngredient'
import Modal from '../Modal/Modal'
import { MODAL_INGREDIENT_TITLE } from '../../utils/constants'
import AppHeader from '../AppHeader/AppHeader'
import { getComponents } from '../../services/actions/receivedComponents'
import LoginPage from '../../pages/LoginPage/LoginPage'
import RegisterPage from '../../pages/RegisterPage/RegisterPage'
import ResetPasswordPage from '../../pages/ResetPasswordPage/ResetPasswordPage'
import ForgotPasswordPage from '../../pages/ForgotPasswordPage/ForgotPasswordPage'
import styles from './App.module.css'


function ModalSwitch() {
  const location = useLocation()
  const history = useHistory()
  const dispatch = useDispatch()
  // @ts-ignore
  const background = location.state && location?.state?.background

  const handleCloseIngredientModal = () => {
    dispatch({ type: CLEAR_DETAIL_INGREDIENT })
    // Возвращаемся к предыдущему пути при закрытии модалки
    history.goBack()
  }

  return (
    <>
      <AppHeader />
      <Switch location={background || location}>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/register">
          <RegisterPage />
        </Route>
        <Route path="/reset-password">
          <ResetPasswordPage />
        </Route>
        <Route path="/forgot-password">
          <ForgotPasswordPage />
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
  )
}

function App() {
  const dispatch = useDispatch()
  // Получаем ингредиенты при монтировании компонента App
  React.useEffect(() => {
    // Вызываем экшн для получения данных от сервера
    dispatch(getComponents())
  }, [])

  return (
    <BrowserRouter>
      <div className={styles.app}>
        <ModalSwitch />
      </div>
    </BrowserRouter>
  )
}

export default App
