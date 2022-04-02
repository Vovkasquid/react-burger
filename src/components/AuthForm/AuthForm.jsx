import React from 'react'
import styles from './AuthForm.module.css'
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from "react-router-dom";


const AuthForm = ({ title }) => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [name, setName] = React.useState('')

  const onPasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const onEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const onNameChange = (e) => {
    setName(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    console.log('submit')
  }

  return (
    <main className={styles.authForm}>
      <form className={styles.fieldsContainer} onSubmit={onSubmit}>
        <h2 className="text text_type_main-medium">{title}</h2>
        {title === 'Регистрация' && <Input
          type="text"
          placeholder="Имя"
          value={email}
          name="email"
          onChange={onEmailChange}
        />}
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
        <Button>{title === 'Вход' ? 'Войти' : title === 'Регистрация' ? 'Зарегестрироваться' : 'Спасти мир'}</Button>
      </form>
      <div className={`mt-20 ${styles.linkContainer}`}>
        {
          title === 'Вход' ? (
            <>
              <p className="text text_type_main-default text_color_inactive">Вы — новый пользователь? <Link className={styles.authLink} to="/register">Зарегистрироваться</Link></p>
              <p className="mt-4 text text_type_main-default text_color_inactive">Забыль пароль? <Link className={styles.authLink} to="/">Восстановить пароль</Link></p>
            </>
          ) :
          title === 'Регистрация' ? (
              <>
                <p className="text text_type_main-default text_color_inactive">Уже зарегистрированы? <Link className={styles.authLink} to="/login">Войти</Link></p>
              </>
          ) :
          (<p>Мама помоги мне</p>)
        }
      </div>
    </main>
  )
}

export default AuthForm