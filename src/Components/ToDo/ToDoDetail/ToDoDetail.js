import React from "react"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"

import { exitToDoDetail, deleteToDo } from "../../../store/actions/todoActions"
import Aux from "../../../hoc/Auxiliary/Auxiliary"
import Button from "../../../UI/Button/Button"
import "./ToDoDetail.css"

const todoDetail = props => {
  const deleteToDo = () => {
    props.deleteToDo(props.todoInfo.id)
    props.history.go("/")
  }

  const updateToDo = () => {
    // move to UpdateToDo component
    // props.updateToDo(props.todoInfo.id)
    props.history.replace("/updateToDo")
  }

  return (
    <Aux styleName="ToDoDetail">
      <div className="wrap">
        <div className="contents">
          <h2>{props.todoInfo.todo}</h2>

          <div className="content">
            <span className="title">Author</span>
            <span className="separator">|</span>
            <p>{props.todoInfo.author}</p>
          </div>

          <div className="content">
            <span className="title">Manager</span>
            <span className="separator">|</span>
            <p>{props.todoInfo.manager}</p>
          </div>

          {props.todoInfo.group && (
            <div className="content">
              <span className="title">Group</span>
              <span className="separator">|</span>
              <p>{props.todoInfo.group}</p>
            </div>
          )}

          {/* <div className="content">
            <span className="title">ID</span>
            <span className="separator">|</span>
            <p>{props.todoInfo.id}</p>
          </div> */}

          <div className="content">
            <span className="title">Priority</span>
            <span className="separator">|</span>
            <p>{props.todoInfo.priority}</p>
          </div>

          <div className="content">
            <span className="title">Completion</span>
            <span className="separator">|</span>
            <p>{props.todoInfo.completeRate}</p>
          </div>

          <div className="content">
            <span className="title">Issue date</span>
            <span className="separator">|</span>
            <p>{props.todoInfo.date}</p>
          </div>

          <div className="content">
            <span className="title">Deadline</span>
            <span className="separator">|</span>
            <p>{props.todoInfo.deadLine}</p>
          </div>

          <div className="content">
            <span className="title">Details</span>
            <span className="separator">|</span>
            <p>{props.todoInfo.details}</p>
          </div>
        </div>
        <div className="btn">
          <Button clicked={updateToDo}>Update</Button>
          <Button clicked={deleteToDo}>Delete</Button>
          <Button clicked={props.exitToDoDetail}>Return</Button>
        </div>
      </div>
    </Aux>
  )
}

const mapStateToProps = state => {
  return {
    todoInfo: state.todo.currentToDo
  }
}

export default connect(
  mapStateToProps,
  { exitToDoDetail, deleteToDo }
)(withRouter(todoDetail))
