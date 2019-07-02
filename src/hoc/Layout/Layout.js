import React, { Component } from "react"

import Aux from "../Auxiliary/Auxiliary"
import Header from "../../Components/Header/Header"
// import Login from "../../Components/Login/Login";
// import TodoList from "../../Components/ToDo/TodoList";

class Layout extends Component {
  // TODO this shouldCommponentUpdate can be replaced with react-redux!?
  async shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.userId !== this.props.userId)
      await this.props.redoGetGroupList()
    return true
  }

  render() {
    return (
      <Aux>
        {/* HEADER */}
        <Header
          // userId={this.props.userId}
          didSignin={this.props.didSignIn}
          signOutClicked={this.props.whenSignOut}
          hasGroupList={this.props.hasGroupList}
        />

        {/* BODY */}
        <main>{this.props.children}</main>
      </Aux>
    )
  }
}

export default Layout
