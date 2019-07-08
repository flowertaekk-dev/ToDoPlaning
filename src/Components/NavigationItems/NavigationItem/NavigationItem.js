import React from "react"

import "./NavigationItem.css"

const navigationItem = props => (
  <li className="NavigationItem" onClick={props.clicked && props.clicked}>
    {props.children}
  </li>
)

export default navigationItem
