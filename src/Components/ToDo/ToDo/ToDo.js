import React, { Component, Fragment } from "react"
import { Route, withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { showToDoDetail } from "../../../store/actions/todoActions"
import UpdateToDo from "../../UpdateToDo/UpdateToDo"
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
        <tr>
          <td colSpan="2" className="btn-container">
            <Button clicked={this.updateBtnClickedHandler}>Update</Button>
          </td>
        </tr>
      </Fragment>
    )

    return (
      <li className="ToDo" onClick={this.toggleShowDetail}>
        <table>
          <caption>ToDo</caption>
          <tbody>
            {todoTitle}
            {this.state.isUpdate ? (
              <Route path="../UpdateToDo/UpdateToDo" render={() => <UpdateToDo />} />
              // <UpdateToDo
              //   id={this.props.id}
              //   deadLine={this.state.deadLine}
              //   taskDetails={this.state.details}
              //   updateTodoContents={this.changeDataHandler}
              //   cancelClicked={this.cancelUpdateHandler}
              //   saveClicked={this.saveUpdatedDataHandler}
              // />
            ) : (
              todoComponent
            )}
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
