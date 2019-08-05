import * as actionTypes from "../Actiontypes/actionTypes"

import firebase from "../../Utils/Config/firebase"

const init = {
  todoList: {}
}

const todoReducer = (state = init, action) => {
  const clonedState = { ...state }
  switch (action.type) {
    case actionTypes.INIT_ALL:
      return {
        todoList: {}
      }
    case actionTypes.FETCH_TODOS_BY_ID:
      clonedState.todoList = action.payload.todosById
      return clonedState
    case actionTypes.ADD_TODO:
      clonedState.selectedGroup = action.payload.selectedGroup
      clonedState.membersBySelectedGroup = action.payload.membersBySelectedGroup
      return clonedState
    default:
      return state
  }
}

export default todoReducer
