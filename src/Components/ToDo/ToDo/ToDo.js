import React, { Component, Fragment } from "react"
import { withRouter } from "react-router-dom"

import firebase from "../../../Utils/Config/firebase"
import "./ToDo.css"

// flowertaekk.dev
class ToDo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isUpdate: false,
      deadLine: props.deadLine,
      taskDetails: props.details
    }
  }

  // moves to Update mode
  updateBtnClickedHandler = () => {
    this.setState({
      isUpdate: !this.state.isUpdate
    })
  }

  cancelUpdateHandler = () => {
    this.setState({
      isUpdate: !this.state.isUpdate,
      deadLine: this.props.deadLine,
      taskDetails: this.props.details
    })
  }

  saveUpdatedDataHandler = () => {
    this.setState({
      isUpdate: !this.state.isUpdate
    })

    const rootRef = firebase.database().ref()
    const todosRef = rootRef.child("todos")
    const todoRef = todosRef.child(this.props.id)
    todoRef.update({
      deadLine: this.state.deadLine,
      details: this.state.taskDetails
    })
  }

  changeDataHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const todoTitle = (
      <tr>
        <th scope="row">TODO</th>
        <td>{this.props.todo}</td>
      </tr>
    )

    const whenUpdatedClicked = (
      <Fragment>
        <tr>
          <th scope="row">Dead-line</th>
          <td>
            <input
              type="date"
              name="deadLine"
              value={this.state.deadLine}
              onChange={this.changeDataHandler}
            />
          </td>
        </tr>
        <tr>
          <th scope="row">Details</th>
          <td>
            <textarea
              name="taskDetails"
              rows="10"
              cols="50"
              value={this.state.taskDetails}
              onChange={this.changeDataHandler}
            />
          </td>
        </tr>
        <tr>
          <td colSpan="2" className="btn-container">
            <button onClick={this.saveUpdatedDataHandler} className="btn">
              SAVE
            </button>
            <button onClick={this.cancelUpdateHandler} className="btn">
              RETURN
            </button>
          </td>
        </tr>
      </Fragment>
    )

    const todoComponent = (
      <Fragment>
        <tr>
          <th scope="row">Dead-line</th>
          <td>{this.state.deadLine}</td>
        </tr>
        <tr>
          <th scope="row">Details</th>
          <td>{this.state.taskDetails}</td>
        </tr>
        <tr>
          <td colSpan="2" className="btn-container">
            <button onClick={this.updateBtnClickedHandler} className="btn">
              UPDATE
            </button>
            <button onClick={this.props.deleteClicked} className="btn">
              DELETE
            </button>
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
            {this.state.isUpdate ? whenUpdatedClicked : todoComponent}
          </tbody>
        </table>
      </li>
    )
  }
}

export default withRouter(ToDo)
