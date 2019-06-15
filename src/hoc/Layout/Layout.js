import React, { Component } from "react"

import Aux from "../Auxiliary/Auxiliary"
import Header from "../../Components/Header/Header"
// import Login from "../../Components/Login/Login";
// import TodoList from "../../Components/ToDo/TodoList";

class Layout extends Component {
  render() {
    return (
      <Aux>
        {/* HEADER */}
        <Header
          userId={this.props.userId}
          didSignin={this.props.didSignIn}
          signOutClicked={this.props.whenSignOut}
        />

        {/* BODY */}
        <main>{this.props.children}</main>
      </Aux>
    )
  }
}

export default Layout
