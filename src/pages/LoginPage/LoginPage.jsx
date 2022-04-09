import React from 'react'
import { Redirect, useHistory } from "react-router-dom";
import { postForgotPassword, postResetPassword } from "../../services/actions/resetAndForgotPasswords";
import { CLEAR_LOGIN_STATE, CLEAR_REGISTER_STATE, loginUser, registerUser } from "../../services/actions/user";
import { useDispatch, useSelector } from "react-redux";
import styles from './LoginPage.module.css'
import AuthForm from "../../components/AuthForm/AuthForm";
import { Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { getCookie } from "../../utils/coockies";

const LoginPage = () => {
  const history = useHistory()
  const userState = useSelector(store => store.user)
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const dispatch = useDispatch()

  const onEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const onPasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const onSubmit = () => {
    // Очищаем ошибки перед запросом
    // setRequestError('')
    dispatch({type: CLEAR_LOGIN_STATE})
    dispatch(loginUser({email, password}))
    setEmail('')
    setPassword('')
  }

  React.useEffect(() => {
    // редирект, есть юзер залогинился успешно
    if (userState.isLoginSuccess) {
      history.replace({pathname: history?.location?.state?.from?.pathname ? history?.location?.state?.from?.pathname  : '/'})
      dispatch({type: CLEAR_LOGIN_STATE})
    }
  }, [dispatch, history, userState])

  if (getCookie('token')) {
    return (
      <Redirect to='/'/>
    )
  }

  return (
    <div className={styles.loginPage}>
      <AuthForm onSubmit={onSubmit} title="Вход" buttonTitle="Войти">
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
      </AuthForm>
    </div>
  )
}

export default LoginPage