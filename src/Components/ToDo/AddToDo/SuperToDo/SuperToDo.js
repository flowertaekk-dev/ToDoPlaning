import React, { useState, useEffect } from "react"

import "./SuperToDo.css"
import Content from "../../../../UI/Content/Content"

const superToDo = props => {
  const [activeStyle, setActiveStyle] = useState(null)

  useEffect(() => {
    if (props.selected) {
      setActiveStyle({ backgroundColor: "#ebecee" })
    } else {
      setActiveStyle(null)
    }
  }, [props.selected])

  return (
    <div className="SuperToDo" style={activeStyle} onClick={props.clicked}>
      <Content title="Key">
        <p>{props.id}</p>
      </Content>

      <Content title="ToDo">
        <p>{props.todo}</p>
      </Content>

      <Content title="Manager">
        <p>{props.manager}</p>
      </Content>
    </div>
  )
}

export default superToDo
