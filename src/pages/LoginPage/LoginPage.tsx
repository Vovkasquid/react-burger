import React, { ChangeEvent} from "react";
import { Redirect, useHistory } from 'react-router-dom'
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { CLEAR_LOGIN_STATE, loginUser} from '../../services/actions/user'
import styles from './LoginPage.module.css'
import AuthForm from '../../components/AuthForm/AuthForm'
import { getCookie } from '../../utils/coockies'
import { TUserState, HistoryWithFrom } from "../../utils/types";

const LoginPage = () => {
  const history = useHistory<HistoryWithFrom>()
  const userState: TUserState = useSelector((store: RootStateOrAny):TUserState => store.user)
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const dispatch = useDispatch()

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const onSubmit = (): void => {
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
