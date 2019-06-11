import React, { Component } from "react"

import firebase from "../../../Utils/Config/firebase"
import "./AddToDo.css"

// flowertaekk.dev
class AddToDo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedDate: this.props.selectedDate,
      groups: ["none"]
    }
  }

  componentDidMount() {
    this.getGroupInfo()
  }

  getGroupInfo = () => {
    const rootRef = firebase.database().ref()
    const usersRef = rootRef.child("users/" + localStorage.getItem("userId"))
    const groupRef = usersRef.child("group")

    groupRef
      .once("value")
      .then(res => {
        const groups = [...this.state.groups, ...res.val()]
        this.setState({ groups: groups })
      })
      .catch(err => console.error(err))
  }

  onSubmitHandler = e => {
    e.preventDefault()

    const {
      selectedDate,
      todo,
      deadLine,
      priority,
      taskDetail,
      group
    } = e.target

    if (
      !this._emptyInputValidator(selectedDate.value, todo.value, deadLine.value)
    )
      return

    // TODO need to check whether or not its userId really exists???

    const rootRef = firebase.database().ref()
    const todosRef = rootRef.child("todos")
    const key = todosRef.push().key
    const todoRef = todosRef.child(key)

    const updateTodo = {
      key: key,
      author: this.props.userId,
      date: selectedDate.value,
      todo: todo.value,
      completeRate: "",
      deadLine: deadLine.value,
      priority: priority.value,
      details: taskDetail.value,
      group: group.value,
      subTodo: [] // TODO 未実装
    }

    todoRef.update(updateTodo)

    this._initializeInputs(e)
  }

  _initializeInputs = e => {
    const { selectedDate, todo, deadLine, priority, taskDetail } = e.target

    selectedDate.value = ""
    todo.value = ""
    deadLine.value = ""
    priority.value = "normal"
    taskDetail.value = ""
  }

  _emptyInputValidator = (selectedDate, todo, deadLine) => {
    let result = true

    // other inputs are optional
    this.setState({
      dateMessage: selectedDate ? "" : "Enter Date",
      todoMessage: todo ? "" : "Enter Todo",
      deadLineMessage: deadLine ? "" : "Enter deadLine"
    })

    if (!selectedDate || !todo || !deadLine) result = false

    return result
  }

  editSelectedDateHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const date = (
      <tr>
        <td>
          <label htmlFor="date">Date</label>
        </td>
        <td>
          <p style={this._floatLeft}>
            <input
              type="date"
              id="date"
              name="selectedDate"
              value={this.state.selectedDate}
              onChange={this.editSelectedDateHandler}
            />
          </p>
        </td>
        <ErrorMessage msg={this.state.dateMessage} />
      </tr>
    )

    const todo = (
      <tr>
        <td>
          <label htmlFor="todo">To do</label>
        </td>
        <td>
          <p style={this._floatLeft}>
            <input type="type" id="todo" name="todo" placeholder="TODO" />
          </p>
        </td>
        <ErrorMessage msg={this.state.todoMessage} />
      </tr>
    )

    const deadLine = (
      <tr>
        <td>
          <label htmlFor="deadLine">Dead-line</label>
        </td>
        <td>
          <p style={this._floatLeft}>
            <input type="date" id="deadLine" name="deadLine" />
          </p>
        </td>
        <ErrorMessage msg={this.state.deadLineMessage} />
      </tr>
    )

    const priority = (
      <tr>
        <td>
          <label htmlFor="priority">Priority</label>
        </td>
        <td>
          <div style={this._floatLeft} className="select-style">
            <select defaultValue="normal" id="priority" name="priority">
              <option value="urgent">urgent</option>
              <option value="normal">normal</option>
              <option value="notHUrry">not in a hurry</option>
            </select>
          </div>
        </td>
      </tr>
    )

    const taskDetail = (
      <tr>
        <td>
          <p>Task detail</p>
        </td>
        <td>
          <textarea name="taskDetail" />
        </td>
      </tr>
    )

    const group = (
      <tr>
        <td>
          <p>Group</p>
        </td>
        <td>
          <select name="group">
            {this.state.groups.map(group => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </td>
      </tr>
    )

    const submitBtn = (
      <tr>
        <td colSpan="2" className="td-button-center">
          <button type="submit">Add</button>
        </td>
      </tr>
    )

    return (
      <div className="AddTodo">
        <form onSubmit={this.onSubmitHandler}>
          <table>
            <caption>AddTodo</caption>
            <thead>
              <tr>
                <th scope="col">Information</th>
                <th scope="col">Inputs</th>
                <th scope="col">Error</th>
              </tr>
            </thead>
            <tbody>
              {date}
              {todo}
              {deadLine}
              {priority}
              {taskDetail}
              {group}
              {submitBtn}
            </tbody>
          </table>
        </form>
      </div>
    )
  }
}

export const ErrorMessage = props => {
  const _errStyle = {
    color: "red"
  }

  return (
    <td>
      <span style={_errStyle}>{props.msg}</span>
    </td>
  )
}

export default AddToDo
