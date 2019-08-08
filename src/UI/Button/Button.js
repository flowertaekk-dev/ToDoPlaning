import React from "react"

const button = props => {
  return (
    <button
      type={props.buttonType} // ex) submit
      disabled={props.buttonDisabled} // disabled attribute
      onClick={props.clicked} // onCLick
    >
      {props.children}
    </button>
  )
}

export default button
