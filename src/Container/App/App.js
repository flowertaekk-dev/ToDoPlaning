import React, { PureComponent } from "react"
import { Route, withRouter } from "react-router-dom"
import { connect } from "react-redux"

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
import * as actionTypes from "../../store/Actiontypes/actionTypes"
import "./App.css"

// flowertaekk.dev
class App extends PureComponent {
  state = {
    groupList: []
  }

  async componentDidMount() {
    if (this.props.userId) {
      this.props.history.push("/todoList")
    }
    await this.readGroupListByUser()
  }

  // TODO I don't think it should be here.
  // It should be either reducer or <TodoList> component
  readGroupListByUser = async () => {
    const rootRef = firebase.database().ref()
    const usersRef = rootRef.child("users/" + this.props.userId)
    // gets group list
    // it doesn't work with async ??? or object? - firebase 'on' function doesn't work with asyn!!!
    await usersRef.child("group").on("value", snap => {
      this.setState({ groupList: snap.val() })
    })
  }

  // TODO this should be in <LogIn> component
  // saves login information
  updateLoginHandler = id => {
    this.props.setLoginedUserId(id)
  }

  // TODO this should be in <Header> component
  signOutHandler = () => {
    this.props.deleteUserId()
  }

  render() {
    return (
      <Layout
        // userId={this.state.userId}
        // didSignIn={this.state.didSignIn}
        whenSignOut={this.signOutHandler}
        hasGroupList={this.state.groupList}
        redoGetGroupList={this.readGroupListByUser}
      >
        <Route exact path="/userUpdate" render={() => <UserUpdate />} />

        <Route path="/messages" render={() => <Messages />} />
        <Route path="/todoList" render={() => <TodoList />} />
        <Route
          path="/signUp"
          render={() => <SignUp whenLoginSuccess={this.updateLoginHandler} />}
        />
        <Route
          path="/addTodo"
          render={() => <AddTodo selectedDate={_getCurrentDate()} />}
        />
        <Route path="/inviteToGroup" render={() => <InviteGroup />} />
        <Route path="/addGroup" render={() => <AddGroup />} />
        <Route
          exact
          path="/"
          render={() => <Login whenLoginSuccess={this.updateLoginHandler} />}
        />
      </Layout>
    )
  }
}

const mapStateToProps = state => {
  return {
    userId: state.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setLoginedUserId: loginedUserId =>
      dispatch({
        type: actionTypes.SAVE_USER_ID,
        payload: { userId: loginedUserId }
      }),
    deleteUserId: () => dispatch({ type: actionTypes.DELETE_USER_ID })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(App))
