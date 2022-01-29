import { BURGER_API } from "../../utils/constants"

export const GET_COMPONENTS_SUCCESS = 'GET_COMPONENTS_SUCCESS'
export const GET_COMPONENTS_FAILED = 'GET_COMPONENTS_FAILED'


export function getComponents() {
  // Воспользуемся первым аргументом из усилителя redux-thunk - dispatch
return function(dispatch) {
      // Запрашиваем данные у сервера
      console.log('у фетча')
  fetch(`${BURGER_API}/ingredients`).then( res  => {
    console.log(res)
    if (res && res.ok) {
              // В случае успешного получения данных вызываем экшен
              // для записи полученных данных в хранилище
      dispatch({
        type: GET_COMPONENTS_SUCCESS,
        components: res.data
      })
    } else {
              // Если произошла ошибка, отправляем соответствующий экшен
      dispatch({
        type: GET_COMPONENTS_FAILED,
        error: 'Произошла серверная ошибка, повторите запрос'
      })
    }
  }).catch( err => {
          // Если сервер не вернул данных, также отправляем экшен об ошибке
          dispatch({
              type: GET_COMPONENTS_FAILED,
              error: `При выполнении запроса произошла ошибка: ${err.statusText}`
          })
      })
}
}