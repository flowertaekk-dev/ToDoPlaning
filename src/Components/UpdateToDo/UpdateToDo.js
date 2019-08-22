import React, { Fragment } from "react"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"

import { exitToDoUpdate, updateExcute } from "../../store/actions/todoActions"
import Button from "../../UI/Button/Button"
import lodash from "lodash"
import "./UpdateToDo.css"

const updateToDo = props => {
  const exitToDoUpdate = () => {
    props.exitToDoUpdate(props.todoInfo.id)
    props.history.replace("/")
  }

  const updateExcute = e => {
    const updatedTodo = {
      id: props.todoInfo.id,
      manager: e.target.manager.value,
      priority: e.target.priority.value,
      completeRate: e.target.completeRate.value,
      deadLine: e.target.deadLine.value,
      details: e.target.details.value
    }
    props.updateExcute(updatedTodo)
    props.history.replace("/todoList")
  }

  return (
    <Fragment>
      <form onSubmit={updateExcute}>
        <tr>
          <th scope="row">Manager</th>
          <td>
            <input
              type="type"
              name="manager"
              defaultValue={props.todoInfo.manager}
              value={props.manager}
              onChange={props.updateTodoContents}
            />
          </td>
        </tr>
        <tr>
          <th scope="row">Priority</th>
          <td>
            <div>
              <select
                defaultValue={props.todoInfo.priority}
                id="priority"
                name="priority"
              >
                <option value="urgent">urgent</option>
                <option value="normal">normal</option>
                <option value="notHurry">not in a hurry</option>
              </select>
            </div>
          </td>
        </tr>
        <tr>
          <th scope="row">completeRate</th>
          <td>
            <select id="completeRate" name="completeRate">
              {lodash.range(1, 101).map(value => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </td>
        </tr>
        <tr>
          <th scope="row">Dead-line</th>
          <td>
            <input
              type="date"
              name="deadLine"
              value={props.managerdeadLine}
              onChange={props.updateTodoContents}
            />
          </td>
        </tr>
        <tr>
          <th scope="row">Details</th>
          <td>
            <textarea
              name="details"
              rows="10"
              cols="50"
              value={props.taskDetails}
              onChange={props.updateTodoContents}
            />
          </td>
        </tr>
        <tr>
          <td colSpan="2" className="btn">
            <Button buttonType="submit">Save</Button>
            <Button clicked={exitToDoUpdate}>Return</Button>
          </td>
        </tr>
      </form>
    </Fragment>
  )
}

const mapStateToProps = state => {
  return {
    todoInfo: state.todo.currentToDo
  }
}

export default connect(
  mapStateToProps,
  { exitToDoUpdate, updateExcute }
)(withRouter(updateToDo))
