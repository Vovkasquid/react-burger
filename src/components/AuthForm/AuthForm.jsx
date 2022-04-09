import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './AuthForm.module.css'

const AuthForm = ({ onSubmit, children, title, buttonTitle}) => {
  const history = useHistory()
  const [requestError, setRequestError] = React.useState('')
  // Получаем диспатч
  const dispatch = useDispatch()
  // Вытащим данные для forgotPassword из стора
  const resetAndForgotPasswordState = useSelector(store => store.resetAndForgotPassword)
  // Вытащим данные о юзере из стора
  const userState = useSelector(store => store.user)

  const onSubmitHandler = (e) => {
    e.preventDefault()
    // Очищаем ошибки перед запросом
    setRequestError('')
    onSubmit()
  }

  React.useEffect(() => {
    if (resetAndForgotPasswordState.resetPasswordRequestError) {
      setRequestError(resetAndForgotPasswordState.resetPasswordRequestError)
    }
    if (resetAndForgotPasswordState.forgotPasswordRequestError) {
      setRequestError(resetAndForgotPasswordState.forgotPasswordRequestError)
    }
  }, [dispatch, history, resetAndForgotPasswordState])

  React.useEffect(() => {
    if (userState.registerError) {
      setRequestError(userState.registerError)
    }
    if (userState.loginError) {
      setRequestError(userState.loginError)
    }
  }, [userState])

  // Очистка поля ошибки при смене страницы
  React.useEffect(() => {
    setRequestError('')
    // Защитим маршрут reset-password
    if (history?.location?.pathname === '/reset-password' && !history?.location?.state?.haveCode) {
      history.replace({pathname: '/login'})
    }
  }, [history.location.pathname])


  return (
    <main className={styles.authForm}>
      <form className={styles.fieldsContainer} onSubmit={onSubmitHandler}>
        <h2 className="text text_type_main-medium">{title}</h2>
        {children}
        <Button>
          {buttonTitle}
        </Button>
      </form>
      <div className={`mt-20 ${styles.linkContainer}`}>
        {
          title === 'Вход' ? (
            <>
              <p className="text text_type_main-default text_color_inactive">Вы — новый пользователь? <Link className={styles.authLink} to="/register">Зарегистрироваться</Link></p>
              <p className="mt-4 text text_type_main-default text_color_inactive">Забыль пароль? <Link className={styles.authLink} to="/forgot-password">Восстановить пароль</Link></p>
            </>
          ) :
          title === 'Регистрация' ? (
              <p className="text text_type_main-default text_color_inactive">Уже зарегистрированы? <Link className={styles.authLink} to="/login">Войти</Link></p>
          ) :
          (
            <p className="text text_type_main-default text_color_inactive">Вспоминили пароль? <Link className={styles.authLink} to="/login">Войти</Link></p>
          )
        }
      </div>
      {requestError && <p className="text text_type_main-default" style={{ color: "hsl(0,100%,50%)" }}>{requestError}</p>}
    </main>
  )
}

export default AuthForm

AuthForm.propTypes = {
  title: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  buttonTitle: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}