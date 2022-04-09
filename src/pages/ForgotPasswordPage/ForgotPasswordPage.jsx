import React from 'react'
import styles from './ForgotPasswordPage.module.css'
import { Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  CLEAR_STATE_FORGOT_PASSWORD,
  CLEAR_STATE_RESET_PASSWORD, postForgotPassword
} from "../../services/actions/resetAndForgotPasswords";
import AuthForm from "../../components/AuthForm/AuthForm";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { getCookie } from "../../utils/coockies";

const ForgotPasswordPage = () => {
  const [resetedEmail, setResetedEmail] = React.useState('')
  const history = useHistory()
  const dispatch = useDispatch()
  const resetAndForgotPasswordState = useSelector(store => store.resetAndForgotPassword)

  const onResetedEmailChange = (e) => {
    setResetedEmail(e.target.value)
  }

  const onSubmit = () => {
    dispatch({type: CLEAR_STATE_FORGOT_PASSWORD})
    dispatch(postForgotPassword(resetedEmail))
    setResetedEmail('')
  }

  React.useEffect(() => {
    if (resetAndForgotPasswordState.isSuccessForgotPasswordRequest) {
      history.replace({pathname: '/reset-password', state: { haveCode: true }})
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