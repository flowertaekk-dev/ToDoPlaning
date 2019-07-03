import * as actionTypes from "./Actiontypes/actionTypes"

const init = {
  userId: localStorage.getItem("userId")
}

const reducer = (state = init, action) => {
  switch (action.type) {
    case actionTypes.SAVE_USER_ID:
      localStorage.setItem("userId", action.payload.userId)
      return { ...state, userId: action.payload.userId }
    case actionTypes.DELETE_USER_ID:
      localStorage.setItem("userId", "")
      return { ...state, userId: "" }
    default:
      break
  }

  return state
}

export default reducer
