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

// gets members data from firebase according to selected group
export const getMembersBySelectedGroup = e => dispatch => {
  const selectedGroup = e.target.value
  if (!selectedGroup) return
  if (selectedGroup === "none") {
    dispatch({
      type: actionTypes.ADD_TODO,
      payload: { selectedGroup: "none", membersBySelectedGroup: ["Select group"] }
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
        payload: { selectedGroup: selectedGroup, membersBySelectedGroup: membersBySelectedGroup }
      })
    })
    .catch(err => console.error(err))
}
