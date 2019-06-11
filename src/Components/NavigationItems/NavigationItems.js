import React, { Fragment } from "react"
import { withRouter, NavLink } from "react-router-dom"

import NavigationItem from "./NavigationItem/NavigationItem"

const navigationItems = props => {
  console.log("[navigationItems]", props)

  const signOutHandler = () => {
    props.signOutClicked()
    props.history.push("/")
  }

  let beforeSignIn,
    afterSignIn = null
  if (!localStorage.getItem("userId")) {
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
            to="/updateUser"
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

export default withRouter(navigationItems)
