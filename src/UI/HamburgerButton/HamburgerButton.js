import React from "react"
import { connect } from "react-redux"

import { menuClicked } from "../../store/actions/commonActions"
import "./HamburgerButton.css"

const hamburgerButton = props => {
  return (
    <div className="HamburgerButton" onClick={props.menuClicked}>
      <div />
      <div />
      <div />
    </div>
  )
}

export default connect(
  null,
  { menuClicked }
)(hamburgerButton)
