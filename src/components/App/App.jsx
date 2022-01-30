import React from 'react'
import styles from './App.module.css'
import AppHeader from '../AppHeader/AppHeader.jsx'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor.jsx'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients.jsx'
import { BURGER_API, MODAL_INGREDIENT_TITLE } from '../../utils/constants.js'
import Modal from '../Modal/Modal.jsx'
import OrderDetails from '../OrderDetails/OrderDetails'
import IngredientDetails from '../IngredientDetails/IngredientDetails'
import { getComponents } from '../../services/actions/receivedComponents'
import { useDispatch, useSelector } from 'react-redux'
import { SET_DETAIL_INGREDIENT, CLEAR_DETAIL_INGREDIENT } from '../../services/actions/detailIngredient'

 // Метод для проверки ответа
 export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  // Если условие не выполнено, то делаем промис с ошибкой
  return Promise.reject(res);
}

export const filterBun = (data) => {
  return data?.filter((item) => item.type === 'bun')
}

export const filterSauces = (data) => {
  return data?.filter((item) => item.type === 'sauce')
}

export const filterMainIngredients = (data) => {
  return data?.filter((item) => item.type === 'main')
}

function App() {
  const [isIngredientModalVisible, setIsIngredientModalVisible] = React.useState(false)
  const [isOrderModalVisible, setIsOrderModalVisible] = React.useState(false)
  const [ingredient, setIngredient] = React.useState({})
  const [choosenBun, setChoosenBun] = React.useState({})
  const [orderNumber, setOrderNumber] = React.useState(0)

  // Вытащим из хранилища данные о элементах с сервера и ошибках
  const { receivedComponents, getComponentsError } = useSelector(store => store.receivedComponents)
  // Получаем диспатч
  const dispatch = useDispatch()

  const handleOpenIngredientModal = (currentIngredient) => {
    dispatch({ type: SET_DETAIL_INGREDIENT, ingredient: currentIngredient })
    setIsIngredientModalVisible(true)
  }
  
  const handleOpenOrderModal = (req) => {
    fetch(`${BURGER_API}/orders`, { method: 'POST', headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ingredients: req })})
      .then((response) => checkResponse(response))
      .then((data) => {
        // Записываем номер заказа в стейт
        setOrderNumber(data.order.number)
        // Открываем попап только после того, как получили ответ от сервера
        setIsOrderModalVisible(true)
      })
      .catch(err => console.log(err))
  }

  const handleCloseIngredientModal = () => {
    setIsIngredientModalVisible(false)
    dispatch({ type: CLEAR_DETAIL_INGREDIENT })
  }

  const handleCloseOrderModal = () => {
    setIsOrderModalVisible(false)
  }

  React.useEffect(() => {
    // Вызываем экшн для получения данных от сервера
    dispatch(getComponents())
  }, [dispatch])

  React.useEffect(() => {
     // Временное решение для выбранной булки
     const buns = filterBun(receivedComponents)
     const bunToChosen = buns[0]
     console.log(buns)
     setChoosenBun(bunToChosen)
  }, [receivedComponents])

  return (
    <div className={styles.application} id="app">
      {isIngredientModalVisible && <Modal
        closePopup={handleCloseIngredientModal}
        title={MODAL_INGREDIENT_TITLE}
      >
        <IngredientDetails />
      </Modal>}
      {isOrderModalVisible &&  <Modal
        closePopup={handleCloseOrderModal}
      >
        <OrderDetails orderNumber={orderNumber} />
      </Modal>}
      <AppHeader />
      {getComponentsError && 
        <p className={`${styles.errorText} text text_type_main-default`}>
          {getComponentsError}
          </p>
        }
      <main className={styles.main}>
        <BurgerIngredients
          openModal={handleOpenIngredientModal}
        />
        { /*Временное решение с choosenBun, пока не сделали выбор булки*/ }
        <BurgerConstructor
          openIngredientModal={handleOpenIngredientModal}
          openOrderModal={handleOpenOrderModal}
          choosenBun={choosenBun}
        />
      </main>
    </div>

  )
}

export default App
