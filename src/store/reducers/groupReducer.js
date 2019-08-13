import * as actionTypes from "../Actiontypes/actionTypes"

const init = {
  groupNames: {},
  groupList: {},
  membersByGroup: {}
}

const groupReducer = (state = init, action) => {
  switch (action.type) {
    case actionTypes.INIT_ALL:
      return {
        groupNames: {},
        groupList: {}
      }
    case actionTypes.ADD_GROUP:
      return state
    case actionTypes.INVITE_TO_GROUP:
      return state
    case actionTypes.FETCH_GROUP_NAMES:
      return { ...state, groupNames: action.payload.groupNames }
    case actionTypes.FETCH_GROUP_NAMES_ASYNC:
      return { ...state, groupNamesAsync: action.payload.groupNamesAsync }
    case actionTypes.GET_MEMBERS_BY_GROUP:
      return { ...state, membersByGroup: action.payload.membersByGroup }
    default:
      return state
  }
}

export default groupReducer
