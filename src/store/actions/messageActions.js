import firebase from "../../Utils/Config/firebase"
import * as actionTypes from "../Actiontypes/actionTypes"

export const fetchMessages = userId => dispatch => {
  const rootRef = firebase.database().ref()
  const userRef = rootRef.child("users/" + userId)
  const messagesRef = userRef.child("messages")
  messagesRef.on("value", snap => {
    dispatch({
      type: actionTypes.FETCH_MESSAGES,
      payload: { messages: snap.val() }
    })
  })
}

export const updateMessageStatus = (userId, messageId) => dispatch => {
  const rootRef = firebase.database().ref()
  const usersRef = rootRef.child("users/" + userId)
  const messagesRef = usersRef.child("messages/" + messageId)
  messagesRef.update({ hasRead: true })
  dispatch({
    type: actionTypes.UPDATE_MESSAGE_STATUS,
    payload: { userId: userId, messageId: messageId }
  })
}

export const joinGroup = (userId, messageId, groupName) => dispatch => {
  const rootRef = firebase.database().ref()
  // users > group
  const usersRef = rootRef.child("users/" + userId)
  const userGroupRef = usersRef.child("group")
  userGroupRef.push(groupName)

  // group > groupName > member
  const groupRef = rootRef.child("group/" + groupName + "/member")
  groupRef.push(userId)

  // message
  const messagesRef = usersRef.child("messages/" + messageId)
  messagesRef.update({ hasRead: true })

  dispatch({
    type: actionTypes.UPDATE_MESSAGE_STATUS,
    payload: { userId, messageId }
  })
}
