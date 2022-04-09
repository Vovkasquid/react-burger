import React from 'react'
import styles from './RegisterPage.module.css'
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_LOGIN_STATE, CLEAR_REGISTER_STATE, registerUser } from "../../services/actions/user";
import AuthForm from "../../components/AuthForm/AuthForm";
import { Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Redirect, useHistory } from "react-router-dom";
import { getCookie } from "../../utils/coockies";

const RegisterPage = () => {
  const userState = useSelector(store => store.user)
  const history = useHistory()
  const [password, setPassword] = React.useState('')
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')

  const dispatch = useDispatch()

  const onPasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const onEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const onNameChange = (e) => {
    setName(e.target.value)
  }

  const onSubmit = () => {
    dispatch({ type: CLEAR_REGISTER_STATE })
    dispatch(registerUser({email, name, password}))
    setEmail('')
    setName('')
    setPassword('')
  }

  React.useEffect(() => {
    // настроим редирект, если юзер успешно зарегался
    if (userState.isRegisterSuccess) {
      history.replace({pathname: '/login'})
      // почистим стейт
      dispatch({ type: CLEAR_REGISTER_STATE })
    }
  }, [dispatch, history, userState])

  if (getCookie('token')) {
    return (
      <Redirect to='/'/>
    )
  }

  return (
    <div className={styles.registerPage}>
      <AuthForm onSubmit={onSubmit} title="Регистрация" buttonTitle="Зарегистрироваться">
        <Input
          type="text"
          placeholder="Имя"
          value={name}
          name="email"
          onChange={onNameChange}
        />
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

export default RegisterPage