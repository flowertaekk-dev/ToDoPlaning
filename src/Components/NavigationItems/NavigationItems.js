import React from "react"
import { withRouter, NavLink } from "react-router-dom"

import NavigationItem from "./NavigationItem/NavigationItem"

const navigationItems = props => {
  console.log("[navigationItems]", props)

  const signOutHandler = () => {
    props.signOutClicked()
    props.history.push("/")
  }

  return (
    <ul>
      {/* Can use it with react-router? */}

      <NavigationItem>
        <NavLink
          to="/updateUser"
          activeStyle={{ color: "lightBlue", fontWeight: "bold" }}
        >
          UPDATE USER
        </NavLink>
      </NavigationItem>
      {/* <NavigationItem link="/" /> */}

      <NavigationItem clicked={signOutHandler}>SIGN OUT</NavigationItem>

      <li>
        <strong>{props.userId}</strong>
      </li>
    </ul>
  )
}

export default withRouter(navigationItems)
