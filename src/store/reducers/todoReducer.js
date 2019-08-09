import * as actionTypes from "../Actiontypes/actionTypes"
// import firebase from "../../Utils/Config/firebase"

const init = {
  todoList: {},
  showToDoDetail: false,
  currentToDo: {}
}

const todoReducer = (state = init, action) => {
  const clonedState = { ...state }
  switch (action.type) {
    // init
    case actionTypes.INIT_ALL:
      return {
        todoList: {}
      }
    // fetches list of todos by ID
    case actionTypes.FETCH_TODOS_BY_ID:
      clonedState.todoList = action.payload.todosById
      return clonedState
    // adds todo
    case actionTypes.ADD_TODO:
      clonedState.selectedGroup = action.payload.selectedGroup
      clonedState.membersBySelectedGroup = action.payload.membersBySelectedGroup
      return clonedState
    // when todo component clicked
    case actionTypes.SHOW_TODO_DETAIL:
      clonedState.showToDoDetail = true
      clonedState.currentToDo = action.payload.info
      return clonedState
    // hides ToDoDetail Component
    case actionTypes.EXIT_TODO_DETAIL:
      clonedState.showToDoDetail = false
      return clonedState
    case actionTypes.DELETE_TODO:
      // do nothing
      return clonedState
    default:
      return state
  }
}

export default todoReducer
