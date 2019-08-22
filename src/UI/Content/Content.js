import React from "react"

const content = props => (
  <div className="content">
    <span className="title">{props.title}</span>
    <span className="separator">|</span>
    {props.children}
    {/* ERROR */}
  </div>
)

export default content
