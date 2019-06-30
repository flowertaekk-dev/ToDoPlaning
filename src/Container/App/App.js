import React, { PureComponent } from "react"
import { Route, withRouter } from "react-router-dom"

import Layout from "../../hoc/Layout/Layout"
import Login from "../../Components/Login/Login"
import TodoList from "../../Components/ToDo/TodoList"
import UserUpdate from "../../Components/UserInfo/UserUpdate"
import SignUp from "../../Components/SignUp/SignUp"
import AddGroup from "../../Components/Grouping/AddGroup/AddGroup"
import AddTodo from "../../Components/ToDo/AddToDo/AddToDo"
import InviteGroup from "../../Components/Grouping/InviteGroup/InviteGroup"
import Messages from "../../Components/Messages/Messages"
import { _getCurrentDate } from "../../Utils/_"
import firebase from "../../Utils/Config/firebase"
import "./App.css"

// flowertaekk.dev
class App extends PureComponent {
  state = {
    userId: "",
    // needless to store userPassword?
    didSignIn: false,
    groupList: []
  }

  async componentDidMount() {
    const userId = localStorage.getItem("userId")
    if (userId) {
      this.setState({
        userId: userId,
        didSignIn: true
      })
      this.props.history.push("/todoList")
    }
    await this.readGroupListByUser()
  }

  readGroupListByUser = async () => {
    const rootRef = firebase.database().ref()
    const usersRef = rootRef.child("users/" + this.state.userId)
    // gets group list
    // TODO it doesn't work with async ??? or object?
    await usersRef.child("group").on("value", snap => {
      this.setState({ groupList: snap.val() })
    })
  }

  // saves login information
  _updateLoginHandler = id => {
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
        hasGroupList={this.state.groupList}
        redoGetGroupList={this.readGroupListByUser}
      >
        <Route exact path="/userUpdate" render={() => <UserUpdate />} />

        <Route
          path="/messages"
          render={() => <Messages id={this.state.userId} />}
        />
        <Route
          path="/todoList"
          render={() => <TodoList userId={this.state.userId} />}
        />
        <Route
          path="/signUp"
          render={() => <SignUp whenLoginSuccess={this._updateLoginHandler} />}
        />
        <Route
          path="/addTodo"
          render={() => (
            <AddTodo
              userId={this.state.userId}
              selectedDate={_getCurrentDate()}
            />
          )}
        />
        <Route path="/inviteToGroup" render={() => <InviteGroup />} />
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
