import React from "react"
import { connect } from "react-redux"

import { fetchTodosById } from "../../store/actions/todoActions"
import HamburgerButton from "../../UI/HamburgerButton/HamburgerButton"
import "./Header.css"

const header = props => {
  return (
    <div className="Header">
      <div className="title">
        <h1>
          <p onClick={() => props.fetchTodosById(props.userId)}>Let's TodoPlanning</p>
        </h1>
      </div>

      <div>
        <HamburgerButton />
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    userId: state.user.userId
  }
}

export default connect(
  mapStateToProps,
  { fetchTodosById }
)(header)
