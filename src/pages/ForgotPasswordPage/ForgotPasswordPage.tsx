import React, { ChangeEvent } from "react";
import styles from './ForgotPasswordPage.module.css'
import { Redirect, useHistory } from 'react-router-dom'
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Input } from '@ya.praktikum/react-developer-burger-ui-components'
import {
  CLEAR_STATE_FORGOT_PASSWORD,
  postForgotPassword
} from '../../services/actions/resetAndForgotPasswords'
import AuthForm from '../../components/AuthForm/AuthForm'
import { getCookie } from '../../utils/coockies'
import { HistoryWithFrom, TAuthState } from "../../utils/types";

const ForgotPasswordPage = () => {
  const [resetedEmail, setResetedEmail] = React.useState('')
  const history = useHistory<HistoryWithFrom>()
  const dispatch = useDispatch()
  const resetAndForgotPasswordState = useSelector((store:RootStateOrAny):TAuthState => store.resetAndForgotPassword)

  const onResetedEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setResetedEmail(e.target.value)
  }

  const onSubmit = (): void => {
    dispatch({type: CLEAR_STATE_FORGOT_PASSWORD})
    dispatch(postForgotPassword(resetedEmail))
    setResetedEmail('')
  }

  React.useEffect(() => {
    if (resetAndForgotPasswordState.isSuccessForgotPasswordRequest) {

      history.replace({pathname: '/reset-password', state: {  haveCode: true }})
      // Очищаем стейт
      dispatch({type: CLEAR_STATE_FORGOT_PASSWORD})
    }
  }, [dispatch, history, resetAndForgotPasswordState])

  React.useEffect(() => {
    // Защитим маршрут reset-password
    if (history?.location?.pathname === '/reset-password' && !history?.location?.state?.haveCode) {
      history.replace({pathname: '/login'})
    }
  }, [history.location.pathname])

  if (getCookie('token')) {
    return (
      <Redirect to='/'/>
    )
  }

  return (
    <div className={styles.forgotPasswordPage}>
      <AuthForm onSubmit={onSubmit} title="Восстановление пароля" buttonTitle="Восстановить">
        <Input
          type="email"
          placeholder="Укажите e-mail"
          value={resetedEmail}
          name="email"
          onChange={onResetedEmailChange}
        />
      </AuthForm>
    </div>
  )
}

export default ForgotPasswordPage
