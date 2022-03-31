import React from 'react'
import { Link } from 'react-router-dom'
import { Button, PasswordInput, Input} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './LoginPage.module.css'
import AppHeader from "../../components/AppHeader/AppHeader";

const LoginPage = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const onPasswordChange = (e) => {
    setPassword(e.target.value)
  }
  const onEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    console.log('submit')
  }
  return (
    <div className={styles.loginPage}>
      <AppHeader />
      <main className={styles.authForm}>
        <form className={styles.fieldsContainer} onSubmit={onSubmit}>
          <h2 className="text text_type_main-medium">Вход</h2>
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
          <Button>Войти</Button>
        </form>
        <div className={`mt-20 ${styles.linkContainer}`}>
          <p className="text text_type_main-default text_color_inactive">Вы — новый пользователь? <Link className={styles.authLink} to="/">Зарегистрироваться</Link></p>
          <p className="mt-4 text text_type_main-default text_color_inactive">Забыль пароль? <Link className={styles.authLink} to="/">Восстановить пароль</Link></p>
        </div>
      </main>
    </div>
  )
}

export default LoginPage