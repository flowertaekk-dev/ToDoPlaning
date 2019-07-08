import * as actionTypes from "../Actiontypes/actionTypes"

const init = {
  todoList: {}
}

const todoReducer = (state = init, action) => {
  switch (action.type) {
    case actionTypes.INIT_ALL:
      return {
        todoList: {}
      }
    default:
      return state
  }
}

export default todoReducer
