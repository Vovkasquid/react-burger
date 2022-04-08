import { BURGER_API } from '../../utils/constants'
import { checkResponse, filterMainIngredients, filterBun, filterSauces } from '../../utils/utils'

export const GET_COMPONENTS_SUCCESS = 'GET_COMPONENTS_SUCCESS'
export const GET_COMPONENTS_FAILED = 'GET_COMPONENTS_FAILED'
export const SET_FILTERED_BUN = 'SET_FILTERED_BUN'
export const SET_FILTERED_SAUCES = 'SET_FILTERED_SAUCES'
export const SET_FILTERED_MAIN_INGREDIENTS = 'SET_FILTERED_MAIN_INGREDIENTS'
export const INC_COUNTER_INGREDIENT = 'INC_COUNTER_INGREDIENT'
export const DEC_COUNTER_INGREDIENT = 'DEC_COUNTER_INGREDIENT'
export const SET_SORTED_ARRAY = 'SET_SORTED_ARRAY'
export function getComponents() {
      // Воспользуемся первым аргументом из усилителя redux-thunk - dispatch
    return function(dispatch) {
      // Запрашиваем данные у сервера
    fetch(`${BURGER_API}/ingredients`).then((response) => checkResponse(response))
      .then((data) => {
        // В случае успешного получения данных вызываем экшен
        // для записи полученных данных в хранилище
        // Каждому объекту нужно добавить поле, в котором будет написано
        // сколько раз его выбрали
        const modifiedData = data.data.map(item => ({...item, counter: 0 }))
        dispatch({
          type: GET_COMPONENTS_SUCCESS,
          components: modifiedData
        })
        // Сразу отфильтровываем элементы из конструктора
        const filteredMainIngredients = filterMainIngredients(modifiedData)
        const filteredBun = filterBun(modifiedData)
        const filteredSauces= filterSauces(modifiedData)
        dispatch({
          type: SET_FILTERED_MAIN_INGREDIENTS,
          filtered: filteredMainIngredients,
        })
        dispatch({
          type: SET_FILTERED_BUN,
          filtered: filteredBun,
        })
        dispatch({
          type: SET_FILTERED_SAUCES,
          filtered: filteredSauces,
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