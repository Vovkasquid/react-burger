import React from 'react'
import { Link } from 'react-router-dom'
import { Input } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './ProfilePage.module.css'
import AppHeader from '../../components/AppHeader/AppHeader'

const ProfilePage = () => {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const onNameChange = (e) => {
    setName(e.target.value)
  }

  const onEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const onPasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    console.log('submit')
  }
  return (
    <div className={styles.profilePage}>
      <AppHeader />
      <main className={styles.profileContainer}>
        <ul className={styles.linkContainer}>
          <li className={styles.listItem}><p className='text text_type_main-medium'>Профиль</p></li>
          <li className={styles.listItem}><Link className={`${styles.link} text text_type_main-medium`} to="/profile/orders">История заказов</Link></li>
          <li className={styles.listItem}><Link className={`${styles.link} text text_type_main-medium`} to="/login">Выход</Link></li>
          <li className={`${styles.listItem} mt-20`} style={{width: '320px'}}><p className='text_type_main-default text_color_inactive' style={{margin: 0}} >В этом разделе вы можете изменить свои персональные данные</p></li>
        </ul>
        <form className={styles.profileForm} onSubmit={onSubmit}>
          <Input
            type="text"
            icon="EditIcon"
            placeholder="Имя"
            value={name}
            name="name"
            onChange={onNameChange}
          />
          <Input
            type="email"
            icon="EditIcon"
            placeholder="E-mail"
            value={email}
            name="email"
            onChange={onEmailChange}
          />
          <Input
            type="password"
            icon="EditIcon"
            placeholder="Пароль"
            value={password}
            name="password"
            onChange={onPasswordChange}
          />
        </form>
      </main>
    </div>
  )
}

export default ProfilePage