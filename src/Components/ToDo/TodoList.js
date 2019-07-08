import React, { Component } from "react"
import { connect } from "react-redux"

import * as _ from "../../Utils/_"
import Todo from "./ToDo/ToDo"
import firebase from "../../Utils/Config/firebase"
import Aux from "../../hoc/Auxiliary/Auxiliary"
import "./TodoList.css"
import { isNull } from "util"

// flowertaekk.dev
class TodoList extends Component {
  state = {
    selectedDate: _.getCurrentDate(),
    todos: {},
    groupList: {}
  }

  componentDidMount() {
    this.hasMounted = true
    this.readTodos()
    // TODO :need to use this:  this.props.getGroupList(this.props.userId)
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
    getArrayData.map((todo, index) => {
      let temp = ""

      if (index !== 0) {
        if (
          parseInt(getArrayData[index - 1].completeRate) <
          parseInt(todo.completeRate)
        ) {
          temp = getArrayData[index - 1].completeRate
          getArrayData[index - 1].completeRate = todo.completeRate
          todo.completeRate = temp
        }
      }
    })
    return getArrayData
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
              {this.setToDos(this.state.todos)[0].map((todo, index) => {
                const selectedDate = this.state.selectedDate
                // todos.forEach(todo => {
                // checks data
                if (
                  todo.date === selectedDate ||
                  (todo.date <= selectedDate && todo.deadLine >= selectedDate)
                ) {
                  return index % 6 <= 0 ? (
                    <li>
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
                // })
                return null
              })}
              {this.setToDos(this.state.todos)[1].map((todo, index) => {
                const selectedDate = this.state.selectedDate
                // todos.forEach(todo => {
                // checks data
                if (
                  todo.date === selectedDate ||
                  (todo.date <= selectedDate && todo.deadLine >= selectedDate)
                ) {
                  return index % 6 <= 0 ? (
                    <li>
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
                // })
                return null
              })}
              {this.setToDos(this.state.todos)[2].map((todo, index) => {
                const selectedDate = this.state.selectedDate
                // todos.forEach(todo => {
                // checks data
                if (
                  todo.date === selectedDate ||
                  (todo.date <= selectedDate && todo.deadLine >= selectedDate)
                ) {
                  return index % 6 <= 0 ? (
                    <li>
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
                // })
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
    userId: state.user.userId
  }
}

export default connect(mapStateToProps)(TodoList)
