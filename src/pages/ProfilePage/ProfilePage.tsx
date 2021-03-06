import React, { ChangeEvent, FC, FormEvent } from "react";
import { NavLink, useHistory } from 'react-router-dom'
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import styles from './ProfilePage.module.css'
import { CLEAR_EXIT_STATE, exitUser, getUser, patchUser } from '../../services/actions/user'
import { TRequest, TUserState } from "../../utils/types";

const ProfilePage: FC = () => {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [isButtonsVisible, setIsButtonsVisible] = React.useState(false)
  const [isNameChanged, setIsNameChanged] = React.useState(false)
  const [isPasswordChanged, setIsPasswordChanged] = React.useState(false)
  const [isEmailChanged, setIsEmailChanged] = React.useState(false)

  const dispatch = useDispatch()
  const userState = useSelector((store:RootStateOrAny):TUserState => store.user)

  const history = useHistory()

  const resetInputs = (): void => {
    setName(userState.name)
    setEmail(userState.email)
    setPassword('')
    setIsEmailChanged(false)
    setIsPasswordChanged(false)
    setIsNameChanged(false)
  }
  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
    if (e.target.value === userState.name) {
      setIsNameChanged(false)
    } else {
      setIsNameChanged(true)
    }
  }

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    if (e.target.value === userState.email) {
      setIsEmailChanged(false)
    } else {
      setIsEmailChanged(true)
    }
  }

  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    if (e.target.value === '') {
      setIsPasswordChanged(false)
    } else {
      setIsPasswordChanged(true)
    }
  }

  React.useEffect(() => {
    if (isNameChanged || isPasswordChanged || isEmailChanged) {
      setIsButtonsVisible(true)
    } else {
      setIsButtonsVisible(false)
    }
  }, [isNameChanged, isPasswordChanged, isEmailChanged])

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Собираем измененённые данные и отправляем
    const request:TRequest = {}
    if (isNameChanged) request.name = name
    if (isEmailChanged) request.email = email
    if (isPasswordChanged) request.password = password
    dispatch(patchUser(request))
    resetInputs()
  }

  const exitHandler = () => {
    dispatch(exitUser())
  }

  const cancelHandler = () => {
    resetInputs()
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
    if (!userState.name) {
      dispatch(getUser())
    }
  }, [])

  // Если юзер в стейте есть, то ставим его
  React.useEffect(() => {
    if (userState.name) {
      resetInputs()
    }
  }, [userState.name])

  return (
    <div className={styles.profilePage}>
      <main className={styles.profileContainer}>
        <ul className={styles.linkContainer}>
          <li className={styles.listItem}><NavLink activeClassName={styles.linkActive} className={`${styles.link} text text_type_main-medium`} exact to="/profile" >Профиль</NavLink></li>
          <li className={styles.listItem}><NavLink activeClassName={styles.linkActive} className={`${styles.link} text text_type_main-medium`} to="/profile/orders">История заказов</NavLink></li>
          <li className={styles.listItem}><p className={`${styles.link} text text_type_main-medium`} onClick={exitHandler}>Выход</p></li>
          <li className={`${styles.listItem} ${styles.listItemWide} mt-20`}><p className={`${styles.listItemText} text_type_main-default text_color_inactive`}>В этом разделе вы можете изменить свои персональные данные</p></li>
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
          {isButtonsVisible && (
            <div className={styles.buttonContainer}>
              { /* @ts-ignore */}
              <Button type="secondary" size="medium" onClick={cancelHandler}>Отмена</Button>
              {/* @ts-ignore */}
              <Button type="primary" size="medium">Сохранить</Button>
            </div>
          )}
        </form>
      </main>
    </div>
  )
}

export default ProfilePage
