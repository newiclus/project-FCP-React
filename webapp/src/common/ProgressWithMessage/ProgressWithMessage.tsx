import React from 'react'
import './ProgressWithMessage.scss'
import {
  PromptMessage,
  ProgressLinearAuto,
  Overlay,
} from '..'

const ProgressWithMessage = ({ message }: {message: string}) => {
  return (
    <React.Fragment>
      <Overlay show />
      <ProgressLinearAuto />
      {
        message && (
          <PromptMessage
            title="Procesando..."
            type="teal"
            message={message}
          />
        )
      }
    </React.Fragment>
  )
}


export default ProgressWithMessage;
