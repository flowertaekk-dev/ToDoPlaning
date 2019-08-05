import * as actionTypes from "../Actiontypes/actionTypes"

export const saveUserId = userId => dispatch => {
  dispatch({ type: actionTypes.SAVE_USER_ID, payload: { userId: userId } })
}
