import React, { Component } from "react"
import { connect } from "react-redux"

import * as _ from "../../Utils/_"
import { fetchTodosById } from "../../store/actions/todoActions"
import Todo from "./ToDo/ToDo"
import firebase from "../../Utils/Config/firebase"
import Aux from "../../hoc/Auxiliary/Auxiliary"
import "./TodoList.css"

// flowertaekk.dev
class TodoList extends Component {
  componentDidMount() {
    this.hasMounted = true
    this.props.fetchTodosById(this.props.userId)
  }

  componentWillUnmount() {
    this.hasMounted = false
  }

  filterWithDate = deadLine => {
    return (
      deadLine <
      [
        this.props.year,
        _.withLeadingZero(this.props.month),
        _.withLeadingZero(this.props.date)
      ].join("-")
    )
  }

  sortByPriority = () => {
    let result = { ...this.props.todoList }

    // sort by deadLine
    return (
      Object.keys(result)
        // wrap literal with array
        .reduce((prev, key) => {
          if (prev.length === 0) return [result[key]]
          return [...prev, result[key]]
        }, [])
        // sort by priority
        .sort((a, b) => {
          if (a.deadLine > b.deadLine) return 1
          if (a.deadLine < b.deadLine) return -1
          return 0
        })
    )
  }

  /**
   * calculates priority with certain condition????
   * IT IS NOT COMPLETED!!!
   */
  calPriority = (insertTime, deadLine, completeRate) => {
    ///////////////// UNCOMPLETED /////////////////
    let insertTimeT = this.getTimestamp(insertTime) / 1000
    let deadLineT = this.getTimestamp(deadLine) / 1000

    return ((deadLineT - insertTimeT) / (completeRate / 100)).toFixed()
  }

  getTimestamp(yearOrDateStr, month, date) {
    // when the number of arguments is 1, it is considered the argument is string with Date data
    if (arguments.length === 1) return new Date(yearOrDateStr).getTime()

    return new Date(yearOrDateStr, month - 1, date).getTime()
  }

  // deletes ToDo
  deleteToDoHandler = todoId => {
    const rootRef = firebase.database().ref()
    const todosRef = rootRef.child("todos")
    const todoRef = todosRef.child(todoId)

    todoRef.remove()
  }

  render() {
    return (
      <Aux styleName="TodoList">
        {/* {this.state.isQuestionIDAvailable && toDoList} */}
        {this.sortByPriority().map(todo => {
          if (this.filterWithDate(todo.deadLine)) {
            return null
          }

          return (
            <Todo
              key={todo.id}
              {...todo}
              deleteClicked={() => this.deleteToDoHandler(todo.id)}
              updateTodo={() => this.updateTodoHandler(todo.id)}
            />
          )
        })}
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.userId,
    todoList: state.todo.todoList,
    year: state.common.date.year,
    month: state.common.date.month + 1,
    date: state.common.date.date
  }
}

export default connect(
  mapStateToProps,
  { fetchTodosById }
)(TodoList)
