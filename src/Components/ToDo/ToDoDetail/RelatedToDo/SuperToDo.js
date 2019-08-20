import React from "react"

import "./SuperToDo.css"

const superToDo = props => (
  <div className="SuperToDo">
    <p>{props.id}</p>
    <p>{props.title}</p>
  </div>
)

export default superToDo
