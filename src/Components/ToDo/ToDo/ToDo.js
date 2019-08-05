import React, { Component, Fragment } from "react"
import { withRouter } from "react-router-dom"

import UpdateToDo from "../UpdateToDo/UpdateToDo"
import Button from "../../../UI/Button/Button"
import "./ToDo.css"

// flowertaekk.dev
class ToDo extends Component {
  state = {
    isUpdate: false
  }

  componentDidMount() {
    // init
    this.setState({
      ...this.state,
      todo: this.props.todo,
      deadLine: this.props.deadLine,
      priority: this.props.priority,
      completeRate: this.props.completeRate,
      details: this.props.details
    })
  }

  // moves to Update mode
  updateBtnClickedHandler = () => {
    this.setState({
      ...this.state,
      isUpdate: !this.state.isUpdate
    })
  }

  cancelUpdateHandler = () => {
    this.setState({
      ...this.state,
      isUpdate: !this.state.isUpdate
    })
  }

  saveUpdatedDataHandler = () => {
    this.setState({
      ...this.state,
      isUpdate: !this.state.isUpdate
    })
  }

  changeDataHandler = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
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
        <tr>
          <td colSpan="2" className="btn-container">
            <Button clicked={this.updateBtnClickedHandler}>Update</Button>
            <Button clicked={this.props.deleteClicked}>Delete</Button>
          </td>
        </tr>
      </Fragment>
    )

    return (
      <li className="ToDo">
        <table>
          <caption>ToDo</caption>
          <tbody>
            {todoTitle}
            {this.state.isUpdate ? (
              <UpdateToDo
                id={this.props.id}
                deadLine={this.state.deadLine}
                taskDetails={this.state.details}
                updateTodoContents={this.changeDataHandler}
                cancelClicked={this.cancelUpdateHandler}
                saveClicked={this.saveUpdatedDataHandler}
              />
            ) : (
              todoComponent
            )}
          </tbody>
        </table>
      </li>
    )
  }
}

export default withRouter(ToDo)
