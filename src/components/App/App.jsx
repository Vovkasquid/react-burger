import React from 'react'
import styles from './App.module.css'
import AppHeader from '../AppHeader/AppHeader.jsx'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor.jsx'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients.jsx'
import { BURGER_API_URL, MODAL_INGREDIENT_TITLE } from '../../utils/constants.js'
import Modal from '../Modal/Modal.jsx'
import ModalOrderItem from '../ModalOrderItem/ModalOrderItem'
import ModalIngredientItem from '../ModalIngredientItem/ModalIngredientItem'
import { IngredientContext } from '../../services/IngredientsContext'

 // Метод для проверки ответа
 function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  // Если условие не выполнено, то делаем промис с ошибкой
  return Promise.reject(res);
}

const filterBun = (data) => {
  return data.filter((item) => item.type === 'bun')
}

const filterSauces = (data) => {
  return data.filter((item) => item.type === 'sauce')
}

const filterMainIngredients = (data) => {
  return data.filter((item) => item.type === 'main')
}

function App() {
  const [bun, setBun] = React.useState([])
  const [sauses, setSauces] = React.useState([])
  const [mainIngrediets, setMainIngredients] = React.useState([])
  const [isIngredientModalVisible, setIsIngredientModalVisible] = React.useState(false)
  const [isOrderModalVisible, setIsOrderModalVisible] = React.useState(false)
  const [ingredient, setIngredient] = React.useState({})
  const [isOrder, setIsOrder] = React.useState(false)
  const [ingredientContext, setIngeredientContext] = React.useState({})

  const handleOpenIngredientModal = (currentIngredient, isCurrentOrder) => {
    setIsIngredientModalVisible(true)
    setIngredient(currentIngredient)
    setIsOrder(isCurrentOrder)
  }
  
  const handleOpenOrderModal = () => {
    setIsOrderModalVisible(true)
  }

  const handleCloseIngredientModal = () => {
    setIsIngredientModalVisible(false)
    setIngredient({})
  }

  const handleCloseOrderModal = () => {
    setIsOrderModalVisible(false)
  }

  React.useEffect(() => {
    fetch(BURGER_API_URL).then((response) => checkResponse(response))
    .then((data) => {
      setSauces(filterSauces(data.data))
      setBun(filterBun(data.data))
      setMainIngredients(filterMainIngredients(data.data))
      // Записывает ингредиенты в контекст
      setIngeredientContext({sauces: filterSauces(data.data), bun: filterBun(data.data), mainIngrediets: filterMainIngredients(data.data)})
    })
    .catch(err => console.log(err))
  }, [])
  return (
    <IngredientContext.Provider value={ingredientContext}>
      <div className={styles.app} id="app">
        <Modal
          isModalVisible={isIngredientModalVisible}
          closePopup={handleCloseIngredientModal}
          ingredient={ingredient}
          isOrder={isOrder}
          title={MODAL_INGREDIENT_TITLE}
        >
          <ModalIngredientItem closePopup={handleCloseIngredientModal} ingredient={ingredient} />
        </Modal>
        <Modal
          isModalVisible={isOrderModalVisible}
          closePopup={handleCloseOrderModal}
        >
          <ModalOrderItem closePopup={handleCloseOrderModal} />
        </Modal>
        <AppHeader />
        <main className={styles.main}>
          <BurgerIngredients
            bun={bun}
            sauses={sauses}
            openModal={handleOpenIngredientModal}
          />
          { /*Временное решение с choosenBun, пока не сделали выбор булки*/ }
          <BurgerConstructor
            mainIngrediets={mainIngrediets}
            openIngredientModal={handleOpenIngredientModal}
            openOrderModal={handleOpenOrderModal}
            choosenBun={bun[0]}
          />
        </main>
      </div>
    </IngredientContext.Provider>

  )
}

export default App
