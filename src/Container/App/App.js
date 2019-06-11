import React, { Component } from "react"
import { Route, withRouter } from "react-router-dom"

import Layout from "../../hoc/Layout/Layout"
import Login from "../../Components/Login/Login"
import TodoList from "../../Components/ToDo/TodoList"
import UserUpdate from "../../Components/UserInfo/UserUpdate"
import AddGroup from "../../Components/Grouping/AddGroup/AddGroup"
import "./App.css"

// flowertaekk.dev
class App extends Component {
  state = {
    userId: "",
    // needless to store userPassword?
    didSignIn: false
  }

  componentDidMount() {
    console.log("[App.js]", this.props)
    const userId = localStorage.getItem("userId")
    if (userId) {
      this.setState({
        userId: userId,
        didSignIn: true
      })
      this.props.history.push("/todoList")
    }
  }

  // saves login information
  _updateLoginHandler = async id => {
    this.setState({
      userId: id,
      didSignIn: true
    })
    // saves userId to session
    localStorage.setItem("userId", id)
  }

  signOutHandler = () => {
    this.setState({
      userId: "",
      didSignIn: false
    })
    localStorage.setItem("userId", "")
  }

  render() {
    return (
      <Layout
        userId={this.state.userId}
        didSignIn={this.state.didSignIn}
        whenSignOut={this.signOutHandler}
      >
        <Route
          exact
          path="/userUpdate"
          render={() => <UserUpdate />}
        />

        <Route
          path="/todoList"
          render={() => <TodoList userId={this.state.userId} />}
        />
        <Route path="/addGroup" render={() => <AddGroup />} />
        <Route
          exact
          path="/"
          render={() => <Login whenLoginSuccess={this._updateLoginHandler} />}
        />
      </Layout>
    )
  }
}

export default withRouter(App)
