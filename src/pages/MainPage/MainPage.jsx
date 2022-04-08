import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useDispatch, useSelector } from 'react-redux'
import styles from './MainPage.module.css'
import Modal from '../../components/Modal/Modal'
import OrderDetails from '../../components/OrderDetails/OrderDetails'
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients'
import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor'
import { SET_DETAIL_INGREDIENT } from '../../services/actions/detailIngredient'
import { CLOSE_ORDER_MODAL, postOrder } from '../../services/actions/order'
import { getComponents } from '../../services/actions/receivedComponents'
import { filterBun } from '../../utils/utils'

const MainPage = () => {
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
  }

  const handleOpenOrderModal = (req) => {
    // Делаем пост-запрос через экшен, который откроет модалку, если запрос успешен
    dispatch(postOrder(req))
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
    <div className={styles.application} id="app">

      {isOrderModalVisible &&  <Modal
        closePopup={handleCloseOrderModal}
      >
        <OrderDetails />
      </Modal>}
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
  )
}

export default MainPage
