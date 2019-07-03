import React, { Fragment, useEffect } from "react"
import { withRouter, NavLink } from "react-router-dom"
import { connect } from "react-redux"

import NavigationItem from "./NavigationItem/NavigationItem"

const navigationItems = props => {
  const signOutHandler = () => {
    props.signOutClicked()
    props.history.push("/")
  }

  // useEffect(() => {
  //   console.log("[USEEFFECT]", props.hasGroupList.length)
  // }, [])

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

        {props.hasGroupList ? (
          <NavigationItem>
            <NavLink
              to="/inviteToGroup"
              activeStyle={{ color: "lightBlue", fontWeight: "bold" }}
            >
              INVITE GROUP
            </NavLink>
          </NavigationItem>
        ) : null}

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
    userId: state.user.userId
  }
}

export default connect(mapStateToProps)(withRouter(navigationItems))
