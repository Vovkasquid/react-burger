import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import styles from './App.module.css'
import AppHeader from '../AppHeader/AppHeader.jsx'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor.jsx'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients.jsx'
import { MODAL_INGREDIENT_TITLE } from '../../utils/constants.js'
import Modal from '../Modal/Modal.jsx'
import OrderDetails from '../OrderDetails/OrderDetails'
import IngredientDetails from '../IngredientDetails/IngredientDetails'
import { getComponents } from '../../services/actions/receivedComponents'
import { useDispatch, useSelector } from 'react-redux'
import { SET_DETAIL_INGREDIENT, CLEAR_DETAIL_INGREDIENT } from '../../services/actions/detailIngredient'
import { postOrder, CLOSE_ORDER_MODAL } from '../../services/actions/order'

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
  const [choosenBun, setChoosenBun] = React.useState({})

  // Вытащим из хранилища данные о элементах с сервера и ошибках
  const { receivedComponents, getComponentsError } = useSelector(store => store.receivedComponents)
  // Вытащим из стора ошибки при POST с заказом
  const orderError = useSelector(store => store.order.error)
  // Вытащим стейт открытия и закрытия модалки
  const isOrderModalVisible = useSelector(store => store.order.isOrderModalVisible)
  // Получаем диспатч
  const dispatch = useDispatch()

  const handleOpenIngredientModal = (currentIngredient) => {
    dispatch({ type: SET_DETAIL_INGREDIENT, ingredient: currentIngredient })
    setIsIngredientModalVisible(true)
  }
  
  const handleOpenOrderModal = (req) => {
    // Делаем пост-запрос через экшен, который откроет модалку, если запрос успешен
    dispatch(postOrder(req))
  }

  const handleCloseIngredientModal = () => {
    setIsIngredientModalVisible(false)
    dispatch({ type: CLEAR_DETAIL_INGREDIENT })
  }

  const handleCloseOrderModal = () => {
    dispatch({ type: CLOSE_ORDER_MODAL })
  }

  React.useEffect(() => {
    // Вызываем экшн для получения данных от сервера
    dispatch(getComponents())
  }, [dispatch])

  React.useEffect(() => {
     // Временное решение для выбранной булки
     const buns = filterBun(receivedComponents)
     const bunToChosen = buns[0]
     setChoosenBun(bunToChosen)
  }, [receivedComponents])

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
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
              <OrderDetails />
            </Modal>}
            <AppHeader />
            {getComponentsError &&
              <p className={`${styles.errorText} text text_type_main-default`}>
                {getComponentsError}
              </p>
            }
            {orderError &&
              <p className={`${styles.errorText} text text_type_main-default`}>
                {orderError}
              </p>
            }
            <main className={styles.main}>
              <DndProvider backend={HTML5Backend}>
                <BurgerIngredients
                  openModal={handleOpenIngredientModal}
                />
                { /*Временное решение с choosenBun, пока не сделали выбор булки*/ }
                <BurgerConstructor
                  openIngredientModal={handleOpenIngredientModal}
                  openOrderModal={handleOpenOrderModal}
                  choosenBun={choosenBun}
                />
              </DndProvider>
            </main>
          </div>
        </Route>
      </Switch>
    </BrowserRouter>


  )
}

export default App
