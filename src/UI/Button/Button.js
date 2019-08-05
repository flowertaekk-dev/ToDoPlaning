import React from "react"

const button = props => {
  return (
    <button
      type={props.buttonType}
      disabled={props.buttonDisabled}
      onClick={props.clicked}
    >
      {props.children}
    </button>
  )
}

export default button
