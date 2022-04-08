import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import styles from './AuthPage.css'
import AppHeader from '../../components/AppHeader/AppHeader'
import AuthForm from '../../components/AuthForm/AuthForm'
import { getCookie } from "../../utils/coockies"

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