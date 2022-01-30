import { BURGER_API } from '../../utils/constants'
import { checkResponse, filterMainIngredients } from '../../components/App/App'

export const GET_COMPONENTS_SUCCESS = 'GET_COMPONENTS_SUCCESS'
export const GET_COMPONENTS_FAILED = 'GET_COMPONENTS_FAILED'
export const SET_FILTERED_BUN = 'SET_FILTERED_BUN'
export const SET_FILTERED_SAUCES = 'SET_FILTERED_SAUCES'
export const SET_FILTERED_MAIN_INGREDIENTS = 'SET_FILTERED_MAIN_INGREDIENTS'


export function getComponents() {
  // Воспользуемся первым аргументом из усилителя redux-thunk - dispatch
  return function(dispatch) {
    // Запрашиваем данные у сервера
    fetch(`${BURGER_API}/ingredients`).then((response) => checkResponse(response))
      .then((data) => {
        // В случае успешного получения данных вызываем экшен
        // для записи полученных данных в хранилище
        dispatch({
          type: GET_COMPONENTS_SUCCESS,
          components: data.data
        })
        // Сразу отфильтровываем элементы из конструктора
        const filteredMainIngredients = filterMainIngredients(data.data)
        dispatch({
          type: SET_FILTERED_MAIN_INGREDIENTS,
          filteredMainIngredients: filteredMainIngredients,
        })
      })
      .catch((err) => {
        // Если что-то пошло не так, то вернём ошибку
        dispatch({
            type: GET_COMPONENTS_FAILED,
            error: `При выполнении запроса произошла ошибка: ${err.statusText}`
        })
      })
  }
}