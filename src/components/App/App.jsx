import React from 'react'
import styles from './App.module.css'
import AppHeader from '../AppHeader/AppHeader.jsx'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor.jsx'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients.jsx'
import { BURGER_API, MODAL_INGREDIENT_TITLE } from '../../utils/constants.js'
import Modal from '../Modal/Modal.jsx'
import OrderDetails from '../OrderDetails/OrderDetails'
import IngredientDetails from '../IngredientDetails/IngredientDetails'
import { IngredientContext } from '../../services/IngredientsContext'
import { getComponents } from '../../services/actions/receivedComponents'
import { useDispatch, useSelector } from 'react-redux'

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
  const [isIngredientModalVisible, setIsIngredientModalVisible] = React.useState(false)
  const [isOrderModalVisible, setIsOrderModalVisible] = React.useState(false)
  const [ingredient, setIngredient] = React.useState({})
  const [ingredientContext, setIngeredientContext] = React.useState({})
  const [choosenBun, setChoosenBun] = React.useState({})
  const [orderNumber, setOrderNumber] = React.useState(0)
  const [isError, setIsError] = React.useState(false)
  const [errorText, setIsErrorText] = React.useState('')

  // Вытащим из хранилища данные о элементах с сервера и ошибках
  const { receivedComponents, getComponentsError } = useSelector(store => store.receivedComponents)
  // Получаем диспатч
  const dispatch = useDispatch()

  const handleOpenIngredientModal = (currentIngredient) => {
    setIsIngredientModalVisible(true)
    setIngredient(currentIngredient)
  }

  // Функция установки ошибки
  const setError = (err) => {
    setIsError(true)
    setIsErrorText(err)
  }

  // Функция очистики ошибки
  const resetError = () => {
    setIsError(false)
    setIsErrorText('')
  }
  
  const handleOpenOrderModal = (req) => {
    // Перед запросом стираем ошибки
    resetError()
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
      .catch(err => setError(err))
  }

  const handleCloseIngredientModal = () => {
    setIsIngredientModalVisible(false)
    setIngredient({})
  }

  const handleCloseOrderModal = () => {
    setIsOrderModalVisible(false)
  }

  React.useEffect(() => {
    /*
    resetError()
    fetch(`${BURGER_API}/ingredients`).then((response) => checkResponse(response))
    .then((data) => {
      // Записывает ингредиенты в контекст
      const mainIngredientsArray = filterMainIngredients(data.data)
      setIngeredientContext({sauces: filterSauces(data.data), bun: filterBun(data.data), mainIngrediets: mainIngredientsArray})
      // Костылим временно выбранную булку
      const bunArray = filterBun(data.data)
      setChoosenBun(bunArray[0])
    })
    
    .catch(err => setError(err))
    */
    // Вызываем экшн для получения данных от сервера
    dispatch(getComponents())
  }, [])
  return (
    <IngredientContext.Provider value={ingredientContext}>
      <div className={styles.application} id="app">
        {isIngredientModalVisible && <Modal
          closePopup={handleCloseIngredientModal}
          title={MODAL_INGREDIENT_TITLE}
        >
          <IngredientDetails ingredient={ingredient} />
        </Modal>}
        {isOrderModalVisible &&  <Modal
          closePopup={handleCloseOrderModal}
        >
          <OrderDetails orderNumber={orderNumber} />
        </Modal>}
        <AppHeader />
        {isError && 
          <p className={`${styles.errorText} text text_type_main-default`}>
            {`При выполнении запроса произошла ошибка: ${errorText.statusText}`}
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
    </IngredientContext.Provider>

  )
}

export default App
