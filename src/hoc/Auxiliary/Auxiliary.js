import React from "react"

const auxiliary = props => (
  <div className={props.styleName} onClick={props.clicked}>
    {props.children}
  </div>
)

export default auxiliary
