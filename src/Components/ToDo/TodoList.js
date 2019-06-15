import React, { Component } from "react"
import { _filter, _mapWithKeys, _getCurrentDate, _map } from "../../Utils/_"
import Todo from "./ToDo/ToDo"
import AddToDo from "./AddToDo/AddToDo"
import firebase from "../../Utils/Config/firebase"
import Aux from "../../hoc/Auxiliary/Auxiliary"

import "./TodoList.css"

// flowertaekk.dev
class TodoList extends Component {
  state = {
    selectedDate: _getCurrentDate(),
    todos: [],
    groupList: []
  }

  componentDidMount() {
    this.hasMounted = true
    this.readTodos()
    //if (localStorage.getItem("userId") || this.props.userId) this._readData()
  }

  componentWillUnmount() {
    this.hasMounted = false
  }

  readTodos = async () => {
    const rootRef = firebase.database().ref()

    await this.readGroupListByUser(rootRef)
    await this.readTodosByGroup(rootRef)
    await this.readTodosByUserId(rootRef)

    console.log("[groupList]", this.state.groupList)
    console.log("[todoRef]", this.state.todos)
  }

  readGroupListByUser = async rootRef => {
    const usersRef = rootRef.child("users/" + localStorage.getItem("userId"))
    const groupRef = usersRef.child("group").once("value")

    // gets group list
    let groupList = null
    await groupRef.then(res => {
      this.setState({ groupList: res.val() })
    })
  }

  readTodosByGroup = async rootRef => {
    // gets todos by every group that user is in
    await this.state.groupList.map(group => {
      const todosRef = rootRef
        .child("todos")
        .orderByChild("group")
        .equalTo(group)
        .once("value")

      todosRef.then(res => {
        const todos = res.val()

        _map(todos, todo => {
          this.setState(prevState => {
            return { todos: [...prevState.todos, todo] }
          })
        })
      })
    })
  }

  readTodosByUserId = async rootRef => {
    const todosRef = rootRef
      .child("todos")
      .orderByChild("manager")
      .equalTo(localStorage.getItem("userId"))
      .once("value")

    todosRef.then(res => {
      const todos = res.val()

      _map(todos, todo => {
        if (!todo.group) {
          this.setState(prevState => {
            return { todos: [...prevState.todos, todo] }
          })
        }
      })
    })
  }

  // saves the current selected date to retrieve certain todos
  _selectDateHandler = async e => {
    await this.setState({
      [e.target.name]: e.target.value
    })
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

    if (this.state.todos.length === 0) {
      toDoList = <p className="todo-list">Please add new tasks!</p>
    } else {
      toDoList = (
        <div className="todo-list">
          {this.state.todos ? (
            <ul className="show-todo">
              {this.state.todos.map(todo => {
                const selectedDate = this.state.selectedDate
                if (
                  todo.date === selectedDate ||
                  (todo.date <= selectedDate && todo.deadLine >= selectedDate)
                )
                  return <Todo {...todo} key={todo.id} />
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
