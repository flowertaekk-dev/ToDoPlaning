import React, { Fragment, useEffect } from "react"
import { withRouter, NavLink } from "react-router-dom"
import { connect } from "react-redux"

import { initAll, toggleMenu } from "../../store/actions/commonActions"
import { fetchMessages } from "../../store/actions/messageActions"
import { fetchGroupList } from "../../store/actions/groupActions"
import NavigationItem from "./NavigationItem/NavigationItem"

const navigationItems = props => {
  useEffect(() => {
    props.fetchGroupList(props.userId)
    props.fetchMessages(props.userId)
  }, [props.userId])

  const signOutHandler = () => {
    props.initAll()
    props.history.replace("/")
    props.toggleMenu()
  }

  let beforeSignIn,
    afterSignIn = null

  if (!props.userId) {
    beforeSignIn = (
      <NavigationItem>
        <NavLink to="/signUp" activeStyle={{ color: "lightBlue", fontWeight: "bold" }}>
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
          <NavLink to="/addTodo" activeStyle={{ color: "lightBlue", fontWeight: "bold" }}>
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

        <li className="greeting">
          <p>
            <strong>Hello, {props.userId}</strong>
          </p>
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

export default connect(
  mapStateToProps,
  { initAll, toggleMenu, fetchMessages, fetchGroupList }
)(withRouter(navigationItems))
