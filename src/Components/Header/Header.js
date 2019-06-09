import React from "react"

import NavigationItems from "../NavigationItems/NavigationItems"
import "./Header.css"

const header = props => {
  return (
    <div className="Header">
      <div className="title">
        <h1>It's ToDoPlanning!</h1>
      </div>

      <nav className="menu">
        {// Code modifier - JuYoung Kang
        props.didSignin ? (
          <NavigationItems
            signOutClicked={props.signOutClicked}
            userId={props.userId}
          />
        ) : null}
      </nav>
    </div>
  )
}

export default header
