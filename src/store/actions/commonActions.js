import * as actionTypes from "../Actiontypes/actionTypes"

export const initAll = () => dispatch =>
  dispatch({ type: actionTypes.INIT_ALL })

export const toggleMenu = () => dispatch => {
  dispatch({ type: actionTypes.MENU_FLAG })
}

/**
 * Calendar
 */

export const selectYear = year => dispatch => {
  dispatch({ type: actionTypes.SELECT_YEAR, payload: { selectedYear: year } })
}

export const selectMonth = month => dispatch => {
  dispatch({
    type: actionTypes.SELECT_MONTH,
    payload: { selectedMonth: month }
  })
}

export const previousMonth = () => dispatch => {
  dispatch({ type: actionTypes.PREVIOUS_MONTH })
}

export const nextMonth = () => dispatch => {
  dispatch({ type: actionTypes.NEXT_MONTH })
}

export const selectDate = date => dispatch => {
  dispatch({ type: actionTypes.SELECT_DATE, payload: { selectedDate: date } })
}
