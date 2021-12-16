import React from 'react'
import styles from './App.module.css'
import AppHeader from '../AppHeader/AppHeader'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
import { BURGER_API_URL } from '../../utils/constants'

 // Метод для проверки ответа
 function checkResponse(res : any) {
  if (res.ok) {
    return res.json();
  }
  // Если условие не выполнено, то делаем промис с ошибкой
  return Promise.reject(res);
}

function App() {
  const [burgerData, setBurgerData] = React.useState([])

  React.useEffect(() => {
    fetch(BURGER_API_URL).then((response) => checkResponse(response))
    .then((data) => {
      console.log(data)
      setBurgerData(data)
    })
    .catch(err => console.log(err))
  }, [])
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </div>
  )
}

export default App;
