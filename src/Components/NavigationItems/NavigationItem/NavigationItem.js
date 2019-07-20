import React from "react"
import { connect } from "react-redux"

import { toggleMenu } from "../../../store/actions/commonActions"

import "./NavigationItem.css"

const navigationItem = props => (
  <li className="NavigationItem" onClick={props.clicked || props.toggleMenu}>
    {props.children}
  </li>
)

export default connect(
  null,
  { toggleMenu }
)(navigationItem)
