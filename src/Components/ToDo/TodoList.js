import React, { Component } from "react"
import { connect } from "react-redux"

import * as _ from "../../Utils/_"
import Todo from "./ToDo/ToDo"
import firebase from "../../Utils/Config/firebase"
import Aux from "../../hoc/Auxiliary/Auxiliary"
import "./TodoList.css"

// flowertaekk.dev
class TodoList extends Component {
  state = {
    selectedDate: _.getCurrentDate(),
    todos: {},
    groupList: {},
    todoArray: [],
    isQuestionIDAvailable: false
  }

  async componentDidMount() {
    this.hasMounted = true
    await this.readTodos()
    // TODO :need to use this:  this.props.getGroupList(this.props.userId)
  }

  componentWillUpdate() {
    console.log("TESTEST", this.state.todos)
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

    this.setState({
      isQuestionIDAvailable: true
    })
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
    _.map(this.state.groupList, async group => {
      await rootRef
        .child("todos")
        .orderByChild("group")
        .equalTo(group)
        .on("value", snap => {
          _.map(snap.val(), todo => {
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
        _.map(snap.val(), todo => {
          if (!todo.group) {
            this.setState(prevState => {
              return { todos: { ...prevState.todos, [todo.id]: { ...todo } } }
            })
          }
          this.setTodoList()
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

    const updateTodos = _.filter(this.state.todos, todo => todo.id !== todoId)

    this.setState(prevState => {
      if (updateTodos.length === 0) {
        return { todos: {} }
      } else {
        return { todos: { ...prevState, updateTodos } }
      }
    })
    todoRef.remove()
  }

  // updates ToDo
  updateTodoHandler = todoId => {
    return e => {
      const target = _.filter(this.state.todos, todo => todo.id === todoId)[0]
      target[e.target.name] = e.target.value

      this.setState(prevState => {
        return { todos: { ...prevState, target } }
      })
    }
  }

  initStateHandler = () => {
    this.setState({
      todos: {},
      groupList: {}
    })
  }

  // sort todos
  setToDos = todoObj => {
    let urgent = []
    let normal = []
    let ect = []
    let result = []
    _.map(todoObj, todo => {
      if (todo) {
        if (todo.priority === "urgent") {
          urgent.push(todo)
        } else if (todo.priority === "normal") {
          normal.push(todo)
        } else {
          ect.push(todo)
        }
      }
    })

    result.push(this.dataSort(urgent))
    result.push(this.dataSort(normal))
    result.push(this.dataSort(ect))

    return result
  }

  // sort todos
  dataSort = getArrayData => {
    const result = []
      .concat(getArrayData)
      .sort((b, a) => parseInt(a.completeRate) > parseInt(b.completeRate))
      .reverse()
    return result
  }

  setTodoList = () => {
    this.setToDos(this.state.todos).forEach(todoArray => {
      todoArray.map((todo, index) => {
        const selectedDate = this.state.selectedDate
        if (
          todo.date === selectedDate ||
          (todo.date <= selectedDate && todo.deadLine >= selectedDate)
        ) {
          // index => Show 5 in a row
          return index % 6 <= 0 ? (
            <li>
              <h1>HELLO</h1>
              <div className="sortTodo">
                <Todo
                  {...todo}
                  key={todo.id}
                  deleteClicked={() => this.deleteToDoHandler(todo.id)}
                  updateTodo={() => this.updateTodoHandler(todo.id)}
                  initState={this.initStateHandler}
                  reloadTodos={this.readTodos}
                />
              </div>
            </li>
          ) : (
            <div className="sortTodo">
              <Todo
                {...todo}
                key={todo.id}
                deleteClicked={() => this.deleteToDoHandler(todo.id)}
                updateTodo={() => this.updateTodoHandler(todo.id)}
                initState={this.initStateHandler}
                reloadTodos={this.readTodos}
              />
            </div>
          )
        }
        return null
      })
      this.setState(prevState => {
        console.log("[prevState]", prevState.todoArray)
        console.log("[newTodoArray]", todoArray)
        return { todoArray: { ...prevState.todoArray, ...todoArray } }
      })
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

    if (
      Object.keys(this.state.todos).length === 0 &&
      this.state.todos.constructor === Object
    ) {
      toDoList = <p className="todo-list">Please add new tasks!</p>
    } else {
      toDoList = (
        <div className="todo-list">
          {this.state.todos ? (
            <ul className="show-todo">
              {_.map(this.state.todoArray, todo => (
                <Todo
                  {...todo}
                  key={todo.id}
                  deleteClicked={() => this.deleteToDoHandler(todo.id)}
                  updateTodo={() => this.updateTodoHandler(todo.id)}
                  initState={this.initStateHandler}
                  reloadTodos={this.readTodos}
                />
              ))}
            </ul>
          ) : null}
        </div>
      )
    }

    return (
      <Aux>
        {dateBtn}
        {this.state.isQuestionIDAvailable && toDoList}
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.userId
  }
}

export default connect(mapStateToProps)(TodoList)
