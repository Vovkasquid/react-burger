import React from 'react'
import styles from './AuthPage.css'
import AppHeader from '../../components/AppHeader/AppHeader'
import AuthForm from '../../components/AuthForm/AuthForm'

const AuthPage = ({ isLogin, isRegister }) => {
  return (
    <div className={styles.loginPage}>
      <AppHeader />
      <AuthForm title={isLogin ? 'Вход' : isRegister ? 'Регистрация' : 'Восстановление пароля'}/>
    </div>
  )
}

export default AuthPage