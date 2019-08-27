import firebase from "../../Utils/Config/firebase"
import * as actionTypes from "../Actiontypes/actionTypes"
import * as _ from "../../Utils/_"

/**
 * fetches list of todos by userID, groupId
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

export const fetchTodosByGroupId = groupId => async dispatch => {
  const rootRef = firebase.database().ref()
  const todosRef = rootRef.child("todos")

  await todosRef
    .orderByChild("group")
    .equalTo(groupId)
    .once("value")
    .then(res => {
      const todosByGroupId = { ...res.val() }

      dispatch({
        type: actionTypes.FETCH_TODOS_BY_GROUPID,
        payload: {
          todoList: todosByGroupId
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
export const deleteToDo = (todoId, superToDo) => dispatch => {
  const rootRef = firebase.database().ref()
  const todosRef = rootRef.child("todos")

  // deletes child-todo info from super-todo
  const superTodoRef = todosRef.child(superToDo)
  superTodoRef.child("childToDo").update({ [todoId]: null })

  // deletes ToDo
  const todoRef = todosRef.child(todoId)
  todoRef.remove()

  dispatch({ type: actionTypes.DELETE_TODO })
}

/**
 * update a certain todo
 * @param {string} todoInfo : the target information to be removed
 */
export const updateExecute = todoInfo => dispatch => {
  const rootRef = firebase.database().ref()
  const todosRef = rootRef.child("todos")
  const todoRef = todosRef.child(todoInfo.id)

  todoRef
    .update({
      manager: todoInfo.manager,
      priority: todoInfo.priority,
      completeRate: todoInfo.completeRate,
      deadLine: todoInfo.deadLine,
      details: todoInfo.details,
      superToDo: todoInfo.superToDo
    })
    .then(res => {
      // todoInfo.saveClicked()
    })
    .catch(err => console.error(err))
  dispatch({ type: actionTypes.UPDATE_EXCUTE })
}
/**
 * exits todo update page
 */
export const exitToDoUpdate = () => dispatch => {
  dispatch({ type: actionTypes.EXIT_TODO_UPDATE })
}

/**
 * adds new todo
 * @param {Object} newToDo
 */
export const addToDo = newToDo => dispatch => {
  const rootRef = firebase.database().ref()
  const todosRef = rootRef.child("todos")
  const key = todosRef.push().key
  const todoRef = todosRef.child(key)

  // adds id property
  newToDo.id = key

  todoRef.update(newToDo)

  if (_.requireNonNull(newToDo.superToDo)) {
    addChildToDoKeyToSuperToDo(Object.keys(newToDo.superToDo)[0], {
      [key]: newToDo.todo
    })
  }

  dispatch({ type: actionTypes.ADD_TODO })
}

const addChildToDoKeyToSuperToDo = (superToDoKey, childToDoKey) => {
  const rootRef = firebase.database().ref()
  const todosRef = rootRef.child("todos")
  const todoRef = todosRef.child(superToDoKey)

  todoRef.child("childToDo").update(childToDoKey)
}
