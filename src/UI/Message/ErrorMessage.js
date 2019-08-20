import React from "react"

// TODO this should be somewhere else.. for example, need to make UI folder?
export const ErrorMessage = props => {
  const _errStyle = {
    color: "red"
  }

  return (
    <div>
      <span style={_errStyle}>{props.msg}</span>
    </div>
  )
}

export default ErrorMessage
