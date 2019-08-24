import React from "react"
import "./Button.css"

const button = props => {
  return (
    <button
      className="Button"
      type={props.buttonType} // ex) submit
      disabled={props.buttonDisabled} // disabled attribute
      onClick={props.clicked} // onCLick
    >
      {props.children}
    </button>
  )
}

export default button
