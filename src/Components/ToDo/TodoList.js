import React, { Component } from "react"
import { _filter, _mapWithKeys, _getCurrentDate } from "../../Utils/_"
import Todo from "./ToDo/ToDo"
import AddToDo from "./AddToDo/AddToDo"
import firebase from "../../Utils/Config/firebase"
import Aux from "../../hoc/Auxiliary/Auxiliary"

import "./TodoList.css"

// flowertaekk.dev
class TodoList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedDate: _getCurrentDate(),
      data: []
    }
  }

  componentDidMount() {
    this.hasMounted = true
    if (localStorage.getItem("userId") || this.props.userId) this._readData()
  }

  componentWillUnmount() {
    this.hasMounted = false
  }

  // reads data from firebase with user ID
  _readData = async () => {
    const rootRef = firebase
      .database()
      .ref()
      .child("todos")
    const todosRef = rootRef
      .orderByChild("author")
      .equalTo(localStorage.getItem("userId") || this.props.userId)
    await todosRef.on("value", snap => {
      if (this.hasMounted) {
        const selectedDate = this.state.selectedDate
        this.setState({
          data: _filter(_mapWithKeys(snap.val()), val => {
            return (
              val.date === selectedDate ||
              (val.date <= selectedDate && val.deadLine >= selectedDate)
            )
          })
        })
      }
    })
  }

  // saves the current selected date to retrieve certain data
  _selectDateHandler = async e => {
    await this.setState({
      [e.target.name]: e.target.value
    })
    this._readData()
  }

  _addTodoHandler = () => {
    this.setState({
      addToDo: !this.state.addToDo
    })
  }

  render() {
    let dateBtn,
      toDoList = null

    dateBtn = (
      <p className="date">
        <input
          type="date"
          name="selectedDate"
          value={this.state.selectedDate}
          onChange={this._selectDateHandler}
        />
      </p>
    )

    if (this.state.data.length === 0) {
      toDoList = <p className="todo-list">Please add new tasks!</p>
    } else {
      toDoList = (
        <div className="todo-list">
          {this.state.data ? (
            <ul className="show-todo">
              {this.state.data.map(todo => {
                return <Todo {...todo} key={todo.index} />
              })}
            </ul>
          ) : null}
        </div>
      )
    }

    return (
      <Aux>
        {dateBtn}
        {toDoList}
      </Aux>
    )
  }
}

export default TodoList
