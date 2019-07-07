import React, { Component } from "react"

import Aux from "../Auxiliary/Auxiliary"
import Header from "../../Components/Header/Header"

class Layout extends Component {
  render() {
    return (
      <Aux>
        {/* HEADER */}
        <Header />

        {/* BODY */}
        <main>{this.props.children}</main>
      </Aux>
    )
  }
}

export default Layout
