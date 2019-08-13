import firebase from "../../Utils/Config/firebase"
import * as actionTypes from "../Actiontypes/actionTypes"

export const fetchGroupList = userId => dispatch => {
  const rootRef = firebase.database().ref()
  const usersRef = rootRef.child("users/" + userId)
  usersRef.child("group").on("value", function(snap) {
    dispatch({
      type: actionTypes.FETCH_GROUP_NAMES,
      payload: { groupNames: snap.val() }
    })
  })
}

export const fetchGroupListAsync = userId => dispatch => {
  const rootRef = firebase.database().ref()
  const usersRef = rootRef.child("users/" + userId)

  usersRef.child("group").once("value")
    .then(snap => {
      const groupNames = { ...snap.val() }
      dispatch({
        type: actionTypes.FETCH_GROUP_NAMES_ASYNC,
        payload: {
          groupNamesAsync: groupNames
        }
      })
    })
    .catch(err => console.error(err))
}

export const addGroup = (userId, groupName) => async dispatch => {
  const rootRef = firebase.database().ref()
  const groupsRef = rootRef.child("group")
  const usersRef = rootRef.child("users")

  const groupRef = groupsRef.child(groupName)
  const userRef = usersRef.child(userId)

  await groupRef
    .child("leader") // group > leader
    .push(userId)

  await groupRef
    .child("member") // group > member
    .push(userId)

  await userRef
    .child("group") // user > group
    .push(groupName)

  dispatch({ type: actionTypes.ADD_GROUP })
}

export const fetchMemberByGroup = groupName => dispatch => {
  const rootRef = firebase.database().ref()
  const groupRef = rootRef.child("group/" + groupName)
  const memberRef = groupRef.child("member")
  memberRef.on("value", snap => {
    dispatch({
      type: actionTypes.GET_MEMBERS_BY_GROUP,
      payload: { membersByGroup: snap.val() }
    })
  })
}
