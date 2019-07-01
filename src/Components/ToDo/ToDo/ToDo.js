import React, { Component, Fragment } from "react"
import { withRouter } from "react-router-dom"

import firebase from "../../../Utils/Config/firebase"
import UpdateToDo from "../UpdateToDo/UpdateToDo"
import "./ToDo.css"

// flowertaekk.dev
class ToDo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isUpdate: false
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
      isUpdate: !this.state.isUpdate
    })
  }

  saveUpdatedDataHandler = () => {
    this.setState({
      isUpdate: !this.state.isUpdate
    })

    // const rootRef = firebase.database().ref()
    // const todosRef = rootRef.child("todos")
    // const todoRef = todosRef.child(this.props.id)
    // todoRef.update({
    //   deadLine: this.state.deadLine,
    //   details: this.state.taskDetails
    // })

    // initializes and reload state from firebase
    this.props.initState()
    this.props.reloadTodos()
  }

  changeDataHandler = e => {
    this.props.updateTodo()(e)
  }

  render() {
    const todoTitle = (
      <tr>
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
          <th scope="row">Details</th>
          <td>{this.props.details}</td>
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
            {this.state.isUpdate ? (
              <UpdateToDo
                id={this.props.id}
                deadLine={this.props.deadLine}
                taskDetails={this.props.details}
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
