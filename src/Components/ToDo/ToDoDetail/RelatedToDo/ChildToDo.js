import React from "react"

import "./ChildToDo.css"

const childToDo = props => (
  <div className="ChildToDo">
    <p>{props.id}</p>
    <p>{props.title}</p>
  </div>
)

export default childToDo
