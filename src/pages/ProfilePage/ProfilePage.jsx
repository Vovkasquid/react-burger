import React from 'react'
import { Link } from 'react-router-dom'
import styles from './ProfilePage.module.css'
import AppHeader from '../../components/AppHeader/AppHeader'


const ProfilePage = () => {
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
      </main>
    </div>
  )
}

export default ProfilePage