import React from 'react'
import styles from './LoginPage.module.css'
import AppHeader from '../../components/AppHeader/AppHeader'
import AuthForm from '../../components/AuthForm/AuthForm'

const LoginPage = () => {
  return (
    <div className={styles.loginPage}>
      <AppHeader />
      <AuthForm />
    </div>
  )
}

export default LoginPage