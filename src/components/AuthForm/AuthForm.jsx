import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styles from './AuthForm.module.css'
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import {
  CLEAR_STATE_FORGOT_PASSWORD, CLEAR_STATE_RESET_PASSWORD,
  postForgotPassword,
  postResetPassword
} from "../../services/actions/resetAndForgotPasswords";


const AuthForm = ({ title }) => {
  const history = useHistory()
  const [email, setEmail] = React.useState('')
  const [resetedEmail, setResetedEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [name, setName] = React.useState('')
  const [newPassword, setNewPassword] = React.useState('')
  const [code, setCode] = React.useState('')
  const [requestError, setRequestError] = React.useState('')
  // Получаем диспатч
  const dispatch = useDispatch()
  // Вытащим данные для forgotPassword из стора
  const resetAndForgotPasswordState = useSelector(store => store.resetAndForgotPassword)

  const onPasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const onEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const onNameChange = (e) => {
    setName(e.target.value)
  }

  const onResetedEmailChange = (e) => {
    setResetedEmail(e.target.value)
  }

  const onNewPasswordChange = (e) => {
    setNewPassword(e.target.value)
  }

  const onCodeChange = (e) => {
    setCode(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    console.log('submit')
    if (history.location.pathname === '/forgot-password') {
      dispatch(postForgotPassword(resetedEmail))
    }
    if (history.location.pathname === '/reset-password') {
      dispatch(postResetPassword({password: newPassword, token: code}))
    }
  }

  React.useEffect(() => {
    if (resetAndForgotPasswordState.isSuccessForgotPasswordRequest) {
      history.replace({pathname: '/reset-password'})
      // Очищаем стейт
      dispatch({type: CLEAR_STATE_FORGOT_PASSWORD})
    }
    if (resetAndForgotPasswordState.isSuccessResetPasswordRequest) {
      // history.replace({pathname: '/reset-password'})
      console.log('success reset')
      // Очищаем стейт
      dispatch({type: CLEAR_STATE_RESET_PASSWORD})
    }
    if (resetAndForgotPasswordState.resetPasswordRequestError) {
      setRequestError(resetAndForgotPasswordState.resetPasswordRequestError)
    }
    if (resetAndForgotPasswordState.forgotPasswordRequestError) {
      setRequestError(resetAndForgotPasswordState.forgotPasswordRequestError)
    }
  }, [history, resetAndForgotPasswordState])
  // Очистка поля ошибки при смене страницы
  React.useEffect(() => {
    setRequestError('')
  }, [history.location.pathname])

  return (
    <main className={styles.authForm}>
      <form className={styles.fieldsContainer} onSubmit={onSubmit}>
        <h2 className="text text_type_main-medium">{title}</h2>
        {title === 'Регистрация' && <Input
          type="text"
          placeholder="Имя"
          value={name}
          name="email"
          onChange={onNameChange}
        />}
        {(title === 'Регистрация' || title === 'Вход') && (
          <>
          <Input
            type="email"
            placeholder="E-mail"
            value={email}
            name="email"
            onChange={onEmailChange}
          />
          <PasswordInput
            value={password}
            name="password"
            onChange={onPasswordChange}
          />
          </>
        )}
        {history.location.pathname === '/forgot-password' && (
          <Input
            type="email"
            placeholder="Укажите e-mail"
            value={resetedEmail}
            name="email"
            onChange={onResetedEmailChange}
          />
        )}
        {history.location.pathname === '/reset-password' && (
          <>
            <PasswordInput
              value={newPassword}
              name="password"
              onChange={onNewPasswordChange}
              placeholder="Введите новый пароль"
            />
            <Input
              type="text"
              placeholder="Введите код из письма"
              value={code}
              name="code"
              onChange={onCodeChange}
            />
          </>
        )}
        <Button>
          {
            title === 'Вход' ?
            'Войти' :
            title === 'Регистрация' ?
              'Зарегестрироваться' :
              history.location.pathname === '/forgot-password' ?
                'Восстановить' :
                'Сохранить'
          }
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