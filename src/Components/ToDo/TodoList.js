import React, { Component } from "react"
import { _getCurrentDate, _map } from "../../Utils/_"
import Todo from "./ToDo/ToDo"
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

    // gets group list
    await this.readGroupListByUser(rootRef)
    // finds todos by group name
    await this.readTodosByGroup(rootRef)
    // finds todos which has no group set
    await this.readTodosByUserId(rootRef)
  }

  readGroupListByUser = async rootRef => {
    const usersRef = rootRef.child("users/" + localStorage.getItem("userId"))
    const groupRef = usersRef.child("group").once("value")

    // gets group list
    await groupRef.then(res => {
      this.setState({ groupList: res.val() })
    })
  }

  readTodosByGroup = async rootRef => {
    // gets todos by every group that user is in

    // if(!this.state.groupList) return
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
      return null
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

  // deletes ToDo
  deleteToDoHandler = todoId => {
    const rootRef = firebase.database().ref()
    const todosRef = rootRef.child("todos")
    const todoRef = todosRef.child(todoId)

    const updateTodos = [...this.state.todos].filter(todo => todo.id !== todoId)
    this.setState({ todos: updateTodos })
    todoRef.remove()
  }

  initStateHandler = () => {
    this.setState({
      todos: [],
      groupList: []
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
                // checks data
                if (
                  todo.date === selectedDate ||
                  (todo.date <= selectedDate && todo.deadLine >= selectedDate)
                ) {
                  return (
                    <Todo
                      {...todo}
                      key={todo.id}
                      deleteClicked={() => this.deleteToDoHandler(todo.id)}
                      initState={this.initStateHandler}
                      reloadTodos={this.readTodos}
                    />
                  )
                }

                return null
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
