import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from 'react-redux'
import styles from './ProfilePage.module.css'
import AppHeader from '../../components/AppHeader/AppHeader'
import { CLEAR_EXIT_STATE, exitUser, getUser } from "../../services/actions/user";

const ProfilePage = () => {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const dispatch = useDispatch()
  const userState = useSelector(store => store.user)

  const history = useHistory()

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

  const exitHandler = () => {
    dispatch(exitUser())
  }

  React.useEffect(() => {
    if (userState.isExitSuccess) {
      dispatch({type: CLEAR_EXIT_STATE})
      history.replace({pathname: '/login'})
      // TODO в идеале бы после отрисовки сабмита добавить где-то около него отрисовку сетевой ошибки и потом стирать её
    }
  }, [userState])

  // Если юзера нет в сторе, но есть кука, то надо юзера получить
  // Исходим из того, что юзер без куки сюда и не попадёт, так что на неё не проверяем
  React.useEffect(() => {
    console.log(userState.name)
    if (!userState.name) {
      console.log('dis')
      dispatch(getUser())
      console.log('after')
    }
  }, [])

  // Если юзер в стейте есть, то ставим его
  React.useEffect(() => {
    if (userState.name) {
      setName(userState.name)
      setEmail(userState.email)
    }
  }, [userState.name])

  return (
    <div className={styles.profilePage}>
      <AppHeader />
      <main className={styles.profileContainer}>
        <ul className={styles.linkContainer}>
          <li className={styles.listItem}><p className='text text_type_main-medium'>Профиль</p></li>
          <li className={styles.listItem}><Link className={`${styles.link} text text_type_main-medium`} to="/profile/orders">История заказов</Link></li>
          <li className={styles.listItem}><p className={`${styles.link} text text_type_main-medium`} style={{cursor: 'pointer'}} onClick={exitHandler}>Выход</p></li>
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
            defaultValue={userState?.name}
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
          />
        </form>
      </main>
    </div>
  )
}

export default ProfilePage