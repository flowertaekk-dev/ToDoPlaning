import * as actionTypes from "../Actiontypes/actionTypes"

const init = {
  menuClicked: false,
  date: {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    date: new Date().getDate()
  }
}

const commonReducer = (state = init, action) => {
  const clonedState = { ...state }
  switch (action.type) {
    case actionTypes.MENU_FLAG:
      return { ...state, menuClicked: !state.menuClicked }

    case actionTypes.SELECT_YEAR:
      clonedState.date.year = action.payload.selectedYear
      return clonedState

    case actionTypes.SELECT_MONTH:
      clonedState.date.month = action.payload.selectedMonth
      return clonedState

    case actionTypes.PREVIOUS_MONTH:
      // For January, stops decreasing number
      if (clonedState.date.month === 0) return state

      clonedState.date.month = clonedState.date.month - 1
      return clonedState

    case actionTypes.NEXT_MONTH:
      // For December, stops increasing number
      if (clonedState.date.month === 11) return state

      clonedState.date.month = clonedState.date.month + 1
      return clonedState

    case actionTypes.SELECT_DATE:
      clonedState.date.date = action.payload.selectedDate
      return clonedState

    default:
      return state
  }
}

export default commonReducer
