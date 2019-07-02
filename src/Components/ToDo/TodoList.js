import React, { Component } from "react"
import { connect } from "react-redux"

import { _getCurrentDate, _map, _filter } from "../../Utils/_"
import Todo from "./ToDo/ToDo"
import firebase from "../../Utils/Config/firebase"
import Aux from "../../hoc/Auxiliary/Auxiliary"
import "./TodoList.css"

// flowertaekk.dev
class TodoList extends Component {
  state = {
    selectedDate: _getCurrentDate(),
    todos: {},
    groupList: {}
  }

  componentDidMount() {
    this.hasMounted = true
    this.readTodos()
  }

  componentWillUnmount() {
    this.hasMounted = false
  }

  // TODO think about whether it is better to delegate below function to redux
  readTodos = async () => {
    const rootRef = firebase.database().ref()

    // gets group list
    await this.readGroupListByUser(rootRef)
    // finds todos which has no group set
    await this.readTodosByUserId(rootRef)
  }

  readGroupListByUser = async rootRef => {
    const usersRef = rootRef.child("users/" + this.props.userId)
    await usersRef.child("group").on("value", snap => {
      this.setState({ groupList: snap.val() })
      // finds todos by group name
      this.readTodosByGroup(rootRef)
    })
  }

  readTodosByGroup = async rootRef => {
    if (!this.state.groupList) return

    // gets todos by every group that user is in
    _map(this.state.groupList, async group => {
      await rootRef
        .child("todos")
        .orderByChild("group")
        .equalTo(group)
        .on("value", snap => {
          _map(snap.val(), todo => {
            this.setState(prevState => {
              return { todos: { ...prevState.todos, [todo.id]: { ...todo } } }
            })
          })
        })

      return null
    })
  }

  readTodosByUserId = async rootRef => {
    await rootRef
      .child("todos")
      .orderByChild("manager")
      .equalTo(this.props.userId)
      .on("value", snap => {
        _map(snap.val(), todo => {
          if (!todo.group) {
            this.setState(prevState => {
              return { todos: { ...prevState.todos, [todo.id]: { ...todo } } }
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

    const updateTodos = _filter(this.state.todos, todo => todo.id !== todoId)

    this.setState(prevState => {
      return { todos: { ...prevState, updateTodos } }
    })
    todoRef.remove()
  }

  // updates ToDo
  updateTodoHandler = todoId => {
    return e => {
      const target = _filter(this.state.todos, todo => todo.id === todoId)[0]
      target[e.target.name] = e.target.value

      this.setState(prevState => {
        return { todos: { ...prevState, target } }
      })
    }
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
              {_map(this.state.todos, todo => {
                const selectedDate = this.state.selectedDate
                if (
                  todo.date === selectedDate ||
                  (todo.date <= selectedDate && todo.deadLine >= selectedDate)
                ) {
                  return (
                    <Todo
                      {...todo}
                      key={todo.id}
                      deleteClicked={() => this.deleteToDoHandler(todo.id)}
                      updateTodo={() => this.updateTodoHandler(todo.id)}
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

const mapStateToProps = state => {
  return {
    userId: state.userId
  }
}

export default connect(mapStateToProps)(TodoList)
