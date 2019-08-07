import React from "react"
import { connect } from "react-redux"

import * as _ from "../../../Utils/_"
import "./ToDoDetail.css"

const todoDetail = props => {
  return (
    <div className="ToDoDetail">
      <h1>{props.todoInfo.id}</h1>
      <h1>{props.todoInfo.author}</h1>
      <h1>{props.todoInfo.completeRate}</h1>
      <h1>{props.todoInfo.date}</h1>
      <h1>{props.todoInfo.deadLine}</h1>
      <h1>{props.todoInfo.detail}</h1>
      <h1>{props.todoInfo.manager}</h1>
      <h1>{props.todoInfo.priority}</h1>
      <h1>{props.todoInfo.todo}</h1>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    todoInfo: state.todo.currentToDo
  }
}

export default connect(mapStateToProps)(todoDetail)
