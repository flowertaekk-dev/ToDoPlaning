import React from "react"
import { Link } from "react-router-dom"

import HamburgerButton from "../../UI/HamburgerButton/HamburgerButton"
import "./Header.css"

const header = props => {
  return (
    <div className="Header">
      <div className="title">
        <h1>
          <Link to="/todoList" replace={true}>
            It's ToDoPlanning!
          </Link>
        </h1>
      </div>

      <div>
        <HamburgerButton />
        {/* <NavigationItems /> */}
      </div>
    </div>
  )
}

export default header
