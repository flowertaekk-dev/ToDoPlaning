import React from "react"
import { Link } from "react-router-dom"

import NavigationItems from "../NavigationItems/NavigationItems"
import "./Header.css"

const header = props => {
  return (
    <div className="Header">
      <div className="title">
        <h1>
          <Link to="/todoList">It's ToDoPlanning!</Link>
        </h1>
      </div>

      <nav className="menu">
        <NavigationItems
          signOutClicked={props.signOutClicked}
          userId={props.userId}
          hasGroupList={props.hasGroupList}
        />
      </nav>
    </div>
  )
}

export default header
