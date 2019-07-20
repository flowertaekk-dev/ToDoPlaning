import * as actionTypes from "../Actiontypes/actionTypes"

export const initAll = () => dispatch =>
  dispatch({ type: actionTypes.INIT_ALL })

export const toggleMenu = () => dispatch => {
  dispatch({ type: actionTypes.MENU_FLAG })
}
