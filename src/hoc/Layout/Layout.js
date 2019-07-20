import React, { Component } from "react"

import Aux from "../Auxiliary/Auxiliary"
import Header from "../../Components/Header/Header"
import "./Layout.css"

class Layout extends Component {
  render() {
    return (
      <Aux styleName="Layout">
        {/* HEADER */}
        <Header />

        {/* BODY */}
        <main>{this.props.children}</main>

        <div className="menu" />
      </Aux>
    )
  }
}

export default Layout
