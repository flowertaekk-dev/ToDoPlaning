import React, { Fragment, useEffect } from "react"
import { withRouter, NavLink } from "react-router-dom"
import { connect } from "react-redux"

import * as actionTypes from "../../store/Actiontypes/actionTypes"
import firebase from "../../Utils/Config/firebase"
import NavigationItem from "./NavigationItem/NavigationItem"

const navigationItems = props => {
  useEffect(() => {
    props.fetchGroupList(props.userId)
    props.fetchMessages(props.userId)
  }, [props.userId])

  const signOutHandler = () => {
    props.initAll()
    props.history.replace("/")
  }

  let beforeSignIn,
    afterSignIn = null

  if (!props.userId) {
    beforeSignIn = (
      <NavigationItem>
        <NavLink
          to="/signUp"
          activeStyle={{ color: "lightBlue", fontWeight: "bold" }}
        >
          SIGN UP
        </NavLink>
      </NavigationItem>
    )
  } else {
    afterSignIn = (
      <Fragment>
        <NavigationItem>
          <NavLink
            to="/messages"
            activeStyle={{ color: "lightBlue", fontWeight: "bold" }}
          >
            MESSAGES
          </NavLink>
        </NavigationItem>

        {props.groupNames && (
          <NavigationItem>
            <NavLink
              to="/inviteToGroup"
              activeStyle={{ color: "lightBlue", fontWeight: "bold" }}
            >
              INVITE GROUP
            </NavLink>
          </NavigationItem>
        )}

        <NavigationItem>
          <NavLink
            to="/addTodo"
            activeStyle={{ color: "lightBlue", fontWeight: "bold" }}
          >
            ADD TODO
          </NavLink>
        </NavigationItem>

        <NavigationItem>
          <NavLink
            to="/userUpdate"
            activeStyle={{ color: "lightBlue", fontWeight: "bold" }}
          >
            UPDATE USER
          </NavLink>
        </NavigationItem>

        <NavigationItem>
          <NavLink
            to="/addGroup"
            activeStyle={{ color: "lightBlue", fontWeight: "bold" }}
          >
            ADD GROUP
          </NavLink>
        </NavigationItem>

        <NavigationItem clicked={signOutHandler}>SIGN OUT</NavigationItem>

        <li>
          <strong>{props.userId}</strong>
        </li>
      </Fragment>
    )
  }

  return (
    <ul>
      {beforeSignIn}
      {afterSignIn}
    </ul>
  )
}

const mapStateToProps = state => {
  return {
    userId: state.user.userId,
    groupNames: state.group.groupNames
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchGroupList: userId => {
      const rootRef = firebase.database().ref()
      const usersRef = rootRef.child("users/" + userId)
      usersRef.child("group").on("value", function(snap) {
        dispatch({
          type: actionTypes.FETCH_GROUP_NAMES,
          payload: { groupNames: snap.val() }
        })
      })
    },
    fetchMessages: userId => {
      const rootRef = firebase.database().ref()
      const userRef = rootRef.child("users/" + userId)
      const messagesRef = userRef.child("messages")
      messagesRef.on("value", snap => {
        dispatch({
          type: actionTypes.FETCH_MESSAGES,
          payload: { messages: snap.val() }
        })
      })
    },
    initAll: () => dispatch({ type: actionTypes.INIT_ALL })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(navigationItems))
