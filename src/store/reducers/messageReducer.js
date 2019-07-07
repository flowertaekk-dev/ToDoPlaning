import * as actionTypes from "../Actiontypes/actionTypes"
import firebase from "../../Utils/Config/firebase"

const init = {
  messages: {}
}

const messageReducer = (state = init, action) => {
  switch (action.type) {
    case actionTypes.FETCH_MESSAGES:
      return { messages: action.payload.messages }
    case actionTypes.UPDATE_MESSAGE_STATUS:
      // TODO need to use redux-thunk! study..
      return state
    default:
      return state
  }
}

export default messageReducer
