import React from "react";
import styles from './ResetPasswordPage.module.css'
import { Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  CLEAR_STATE_FORGOT_PASSWORD,
  CLEAR_STATE_RESET_PASSWORD,
  postResetPassword
} from "../../services/actions/resetAndForgotPasswords";
import AuthForm from "../../components/AuthForm/AuthForm";
import { Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { getCookie } from "../../utils/coockies";

const ResetPasswordPage = () => {
  const history = useHistory()
  const resetAndForgotPasswordState = useSelector(store => store.resetAndForgotPassword)
  const dispatch = useDispatch()
  const [newPassword, setNewPassword] = React.useState('')
  const [code, setCode] = React.useState('')

  const onNewPasswordChange = (e) => {
    setNewPassword(e.target.value)
  }

  const onCodeChange = (e) => {
    setCode(e.target.value)
  }

  const onSubmit = () => {
    dispatch({type: CLEAR_STATE_RESET_PASSWORD})
    dispatch(postResetPassword({password: newPassword, token: code}))
    setNewPassword('')
    setCode('')
  }

  React.useEffect(() => {
    if (resetAndForgotPasswordState.isSuccessResetPasswordRequest) {
      // Очищаем стейт
      dispatch({type: CLEAR_STATE_RESET_PASSWORD})
      // и редиректим на логин
      history.replace({pathname: '/login'})
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
    <div className={styles.resetPasswordPage}>
      <AuthForm onSubmit={onSubmit} title="Восстановление пароля" buttonTitle="Сохранить">
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
      </AuthForm>
    </div>
  )
}

export default ResetPasswordPage