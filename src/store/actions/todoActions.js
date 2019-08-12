import firebase from "../../Utils/Config/firebase"
import * as actionTypes from "../Actiontypes/actionTypes"

/**
 * fetches list of todos by userID
 * @param {string} userId : userID
 */
export const fetchTodosById = userId => dispatch => {
  const rootRef = firebase.database().ref()
  const todosRef = rootRef.child("todos")
  todosRef
    .orderByChild("manager")
    .equalTo(userId)
    .on("value", snap => {
      dispatch({
        type: actionTypes.FETCH_TODOS_BY_ID,
        payload: { todosById: snap.val() }
      })
    })
}

/**
 * gets members data from firebase according to selected group
 * @param {Object} e : event object
 */
export const getMembersBySelectedGroup = e => dispatch => {
  const selectedGroup = e.target.value
  if (!selectedGroup) return
  if (selectedGroup === "none") {
    dispatch({
      type: actionTypes.ADD_TODO,
      payload: {
        selectedGroup: "none",
        membersBySelectedGroup: ["Select group"]
      }
    })
    return
  }

  const rootRef = firebase.database().ref()
  const groupRef = rootRef.child("group/" + selectedGroup)
  const memberRef = groupRef.child("member")
  memberRef
    .once("value")
    .then(res => {
      const membersBySelectedGroup = { ...res.val() }
      dispatch({
        type: actionTypes.ADD_TODO,
        payload: {
          selectedGroup: selectedGroup,
          membersBySelectedGroup: membersBySelectedGroup
        }
      })
    })
    .catch(err => console.error(err))
}

/**
 * gets todo details
 * @param {Object} todo : todo information to show in ToDoDetail page
 */
export const showToDoDetail = todo => dispatch => {
  dispatch({ type: actionTypes.SHOW_TODO_DETAIL, payload: { info: todo } })
}
/**
 * exits todo details page
 */
export const exitToDoDetail = () => dispatch => {
  dispatch({ type: actionTypes.EXIT_TODO_DETAIL })
}

/**
 * deletes a certain todo
 * @param {string} todoId : the target Id to be removed
 */
export const deleteToDo = todoId => dispatch => {
  const rootRef = firebase.database().ref()
  const todosRef = rootRef.child("todos")
  const todoRef = todosRef.child(todoId)
  todoRef.remove()

  dispatch({ type: actionTypes.DELETE_TODO })
}
