import React, { Component, Fragment } from "react"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { showToDoDetail } from "../../../store/actions/todoActions"
import "./ToDo.css"

// flowertaekk.dev
class ToDo extends Component {
  toggleShowDetail = () => {
    const {
      author,
      completeRate,
      date,
      deadLine,
      details,
      group,
      superToDo,
      childToDo,
      id,
      manager,
      priority,
      todo
    } = this.props

    const todoObj = {
      author,
      completeRate,
      date,
      deadLine,
      details,
      group,
      superToDo,
      childToDo,
      id,
      manager,
      priority,
      todo
    }

    this.props.showToDoDetail(todoObj)
  }

  render() {
    const todoTitle = (
      <tr className="title">
        <th scope="row">TODO</th>
        <td>{this.props.todo}</td>
      </tr>
    )

    const todoComponent = (
      <Fragment>
        <tr>
          <th scope="row">Dead-line</th>
          <td>{this.props.deadLine}</td>
        </tr>
        <tr>
          <th scope="row">Priority</th>
          <td>{this.props.priority}</td>
        </tr>
        <tr>
          <th scope="row">CompleteRate</th>
          <td>{this.props.completeRate}</td>
        </tr>
        <tr>
          <th scope="row">Details</th>
          <td>{this.props.details}</td>
        </tr>
      </Fragment>
    )

    return (
      <li className="ToDo" onClick={this.toggleShowDetail}>
        <table>
          <caption>ToDo</caption>
          <tbody>
            {todoTitle}
            {todoComponent}
          </tbody>
        </table>
      </li>
    )
  }
}

const mapStateToProps = state => {
  return {
    showToDoDetail: state.todo.showToDoDetail
  }
}

export default connect(
  mapStateToProps,
  { showToDoDetail }
)(withRouter(ToDo))
