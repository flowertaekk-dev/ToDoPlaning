import firebase from "../../Utils/Config/firebase"
import * as actionTypes from "../Actiontypes/actionTypes"
import * as _ from "../../Utils/_"

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
