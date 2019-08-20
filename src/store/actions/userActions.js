import firebase from "../../Utils/Config/firebase"
import * as actionTypes from "../Actiontypes/actionTypes"

export const saveUserId = userId => dispatch => {
  dispatch({ type: actionTypes.SAVE_USER_ID, payload: { userId: userId } })
}

export const getPassword = userId => dispatch => {
  const rootRef = firebase.database().ref()
  const userRef = rootRef.child("users/" + userId)

  userRef
    .once("value")
    .then(res => {
      const password = { ...res.val() }
      dispatch({
        type: actionTypes.GET_USER_PASSWORD,
        payload: {
          password: password
        }
      })
    })
    .catch(err => console.error(err))
}
