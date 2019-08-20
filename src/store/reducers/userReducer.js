import * as actionTypes from "../Actiontypes/actionTypes"

const init = {
  userId: localStorage.getItem("userId")
}

const userReducer = (state = init, action) => {
  switch (action.type) {
    case actionTypes.SAVE_USER_ID:
      localStorage.setItem("userId", action.payload.userId)
      return { ...state, userId: action.payload.userId }
    case actionTypes.GET_USER_PASSWORD:
      localStorage.setItem("password", action.payload.password)
      return { ...state, password: action.payload.password }
    case actionTypes.INIT_ALL:
      localStorage.setItem("userId", "")
      return { ...state, userId: "" }
    default:
      break
  }

  return state
}

export default userReducer
