import React, { FC, FormEvent } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './AuthForm.module.css'
import { HistoryWithFrom, TAuthForm, TAuthState, TUserState } from '../../utils/types'

const AuthForm: FC<TAuthForm> = ({ onSubmit, title, buttonTitle, children}) => {
  const history = useHistory<HistoryWithFrom>()
  const [requestError, setRequestError] = React.useState('')
  // Получаем диспатч
  const dispatch = useDispatch()
  // Вытащим данные для forgotPassword из стора
  const resetAndForgotPasswordState: TAuthState  = useSelector((store: RootStateOrAny) => store.resetAndForgotPassword)
  // Вытащим данные о юзере из стора
  const userState: TUserState = useSelector((store: RootStateOrAny) => store.user)

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
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
        {/* @ts-ignore */}
        <Button>{buttonTitle}</Button>
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
            <p className="text text_type_main-default text_color_inactive">Вспомнили пароль? <Link className={styles.authLink} to="/login">Войти</Link></p>
          )
        }
      </div>
      {requestError && <p className={`${styles.errorText} text text_type_main-default`}>{requestError}</p>}
    </main>
  )
}

export default AuthForm
