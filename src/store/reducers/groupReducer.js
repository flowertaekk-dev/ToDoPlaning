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
    case actionTypes.FETCH_GROUP_NAMES:
      return { ...state, groupNames: action.payload.groupNames }
    case actionTypes.GET_MEMBERS_BY_GROUP:
      return { ...state, membersByGroup: action.payload.membersByGroup }
    default:
      return state
  }
}

export default groupReducer
