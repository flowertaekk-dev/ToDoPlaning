import * as actionTypes from "../Actiontypes/actionTypes"
import * as _ from "../../Utils/_"

const init = {
  messages: {}
}

const messageReducer = (state = init, action) => {
  switch (action.type) {
    case actionTypes.FETCH_MESSAGES:
      return { messages: action.payload.messages }
    case actionTypes.UPDATE_MESSAGE_STATUS:
      const messages = _.filter(
        { ...state.messages },
        message => message.id !== action.payload.messageId
      )
      return { ...state, messages }
    default:
      return state
  }
}

export default messageReducer
