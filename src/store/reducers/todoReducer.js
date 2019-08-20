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
    // fetches list of todos by GROUPID
    case actionTypes.FETCH_TODOS_BY_GROUPID:
      clonedState.todoList = action.payload.todoList
      return clonedState
    // adds new todo
    case actionTypes.ADD_TODO:
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
    // deletes todo
    case actionTypes.DELETE_TODO:
      return clonedState
    default:
      return state
  }
}

export default todoReducer
