import React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

import { fetchTodosById } from "../../store/actions/todoActions"
import HamburgerButton from "../../UI/HamburgerButton/HamburgerButton"
import "./Header.css"

const header = props => {
  const titleClicked = () => {
    props.history.push("/")
    props.fetchTodosById(props.userId)
  }

  return (
    <div className="Header">
      <div className="title">
        <h1>
          <p onClick={titleClicked}>Let's TodoPlanning</p>
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
)(withRouter(header))
