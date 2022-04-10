import React from 'react'
import styles from './AppHeader.module.css'
import { NavLink, useHistory } from 'react-router-dom'
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

export default function AppHeader() {
  const history = useHistory()
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li>
              <NavLink
              exact to="/"
              className={`${styles.link} pt-4 pb-4 pr-5 pl-5`}
              activeClassName={styles.linkActive}
              >
                <BurgerIcon type={history.location.pathname === '/' ? 'primary' : 'secondary'} />
                <p className="text text_type_main-default">Конструктор</p>
              </NavLink>
            </li>
            <li>
              <NavLink
              to="/abc"
              className={`${styles.link} pt-4 pb-4 pr-5 pl-5`}
              activeClassName={styles.linkActive}
              >
                <ListIcon type={history.location.pathname === '/abc' ? 'primary' : 'secondary'} />
                <p className="text text_type_main-default">Лента заказов</p>
              </NavLink>
            </li>
        </ul>
        </nav>
        <Logo />
        <nav className={styles.nav}>
          <NavLink
            to="/profile"
            className={`${styles.link}  pt-4 pb-4 pr-5 pl-5`}
            activeClassName={styles.linkActive}
            >
              <ProfileIcon type={history.location.pathname === '/profile' ? 'primary' : 'secondary'} />
              <p className="text text_type_main-default">Личный кабинет</p>
          </NavLink>
        </nav>
      </div>
    </header>
  )
}