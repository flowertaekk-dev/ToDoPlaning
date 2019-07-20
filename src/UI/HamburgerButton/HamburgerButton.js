import React from "react"
import { connect } from "react-redux"

import { toggleMenu } from "../../store/actions/commonActions"
import "./HamburgerButton.css"

const hamburgerButton = props => {
  return (
    <div className="HamburgerButton" onClick={props.toggleMenu}>
      <div />
      <div />
      <div />
    </div>
  )
}

export default connect(
  null,
  { toggleMenu }
)(hamburgerButton)
