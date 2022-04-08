import React from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import styles from './AuthPage.css'
import AuthForm from '../../components/AuthForm/AuthForm'
import { getCookie } from '../../utils/coockies'

const AuthPage = ({ isLogin, isRegister }) => {
  if (getCookie('token')) {
    return (
      <Redirect to='/'/>
    )
  }
  return (
    <div className={styles.loginPage}>
      <AuthForm title={isLogin ? 'Вход' : isRegister ? 'Регистрация' : 'Восстановление пароля'}/>
    </div>
  )
}

export default AuthPage

AuthPage.propTypes = {
  isLogin: PropTypes.bool,
  isRegister: PropTypes.bool,
}