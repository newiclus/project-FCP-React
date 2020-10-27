import React from 'react'
import { Message } from 'semantic-ui-react'
import './PromptMessage.scss'

interface IAlertMessage {
  title: string
  message: string
  type: any
}

const PromptMessage = ({ title, message, type="teal" }: IAlertMessage) => {

  return (
    <div className="prompt-container">
      <Message color={type}>
        <Message.Header>{title}</Message.Header>
        <p>{message}</p>
      </Message>
    </div>
  )
}

export default PromptMessage;
