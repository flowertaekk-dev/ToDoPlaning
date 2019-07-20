import * as actionTypes from "../Actiontypes/actionTypes"

const init = {
  menuClicked: false
}

const commonReducer = (state = init, action) => {
  switch (action.type) {
    case actionTypes.MENU_FLAG:
      return { ...state, menuClicked: !state.menuClicked }
    default:
      return state
  }
}

export default commonReducer
