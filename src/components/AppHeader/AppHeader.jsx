import React from 'react'
import styles from './AppHeader.module.css'
import { NavLink } from 'react-router-dom'
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

export default function AppHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li>
              <NavLink
              to="/"
              className={`${styles.link} ${styles.linkActive} pt-4 pb-4 pr-5 pl-5`}
              >
                <BurgerIcon type="primary" />
                <p className="text text_type_main-default">Конструктор</p>
              </NavLink>
            </li>
            <li>
              <NavLink
              to="/"
              className={`${styles.link} pt-4 pb-4 pr-5 pl-5`}
              >
                <ListIcon type="secondary" />
                <p className="text text_type_main-default">Лента заказов</p>
              </NavLink>
            </li>
        </ul>
        </nav>
        <Logo />
        <nav className={styles.nav}>
          <NavLink
            to="/"
            className={`${styles.link} pt-4 pb-4 pr-5 pl-5`}
            >
              <ProfileIcon type="secondary" />
              <p className="text text_type_main-default">Личный кабинет</p>
          </NavLink>
        </nav>
      </div>
    </header>
  )
}