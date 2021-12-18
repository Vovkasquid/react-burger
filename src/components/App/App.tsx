import React from 'react'
import styles from './App.module.css'
import AppHeader from '../AppHeader/AppHeader'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
import { BURGER_API_URL } from '../../utils/constants'
import Modal from '../Modal/Modal'

 // Метод для проверки ответа
 function checkResponse(res : any) {
  console.log(res)
  if (res.ok) {
    return res.json();
  }
  // Если условие не выполнено, то делаем промис с ошибкой
  return Promise.reject(res);
}

const filterBun = (data : any) => {
  return data.filter((item : any) => item.type === 'bun')
}

const filterSauces = (data : any) => {
  return data.filter((item : any) => item.type === 'sauce')
}

const filterMainIngredients = (data : any) => {
  return data.filter((item : any) => item.type === 'main')
}

function App() {
  const [bun, setBun] = React.useState([])
  const [sauses, setSauces] = React.useState([])
  const [mainIngrediets, setMainIngredients] = React.useState([])

  React.useEffect(() => {
    fetch(BURGER_API_URL).then((response) => checkResponse(response))
    .then((data) => {
      setSauces(filterSauces(data.data))
      setBun(filterBun(data.data))
      setMainIngredients(filterMainIngredients(data.data))
    })
    .catch(err => console.log(err))
  }, [])
  return (
    <div className={styles.app} id="app">
      <Modal />
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients bun={bun} sauses={sauses}/>
        <BurgerConstructor mainIngrediets={mainIngrediets} />
      </main>
    </div>
  )
}

export default App;
