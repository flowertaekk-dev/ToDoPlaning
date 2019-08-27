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
import UpdateToDo from "../../Components/UpdateToDo/UpdateToDo"
import "./App.css"

// flowertaekk.dev
class App extends PureComponent {
  async componentDidMount() {
    if (this.props.userId) {
      this.props.history.push("/todoList")
    }
  }

  render() {
    return (
      <Layout
        whenSignOut={this.signOutHandler}
        redoGetGroupList={this.readGroupListByUser}
      >
        <Route exact path="/userUpdate" render={() => <UserUpdate />} />
        <Route path="/messages" render={() => <Messages />} />
        <Route path="/todoList" render={() => <TodoList />} />
        <Route path="/signUp" render={() => <SignUp />} />
        <Route path="/addTodo" render={() => <AddTodo />} />
        <Route path="/inviteToGroup" render={() => <InviteGroup />} />
        <Route path="/addGroup" render={() => <AddGroup />} />
        <Route path="/UpdateToDo" render={() => <UpdateToDo />} />
        <Route exact path="/" render={() => <Login />} />
      </Layout>
    )
  }
}

export default withRouter(App)
