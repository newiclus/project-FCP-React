import React, { useEffect, useState } from 'react';
import { Progress } from 'semantic-ui-react'
import './ProgressLinearAuto.scss'

const ProgressLinearAuto = () => {
  const [completed, setCompleted] = useState(0)

  useEffect(() => {
    let timer = window.setInterval(progress, 500)

    return () => {
      clearInterval(timer)
    }
  })

  const progress = () => {
    if (completed === 100) {
      setCompleted(0)
    } else {
      const diff = Math.random() * 10
      setCompleted(Math.min(completed + diff, 100))
    }
  }

  return (
    <div className="attached">
      <Progress percent={completed} attached='top' color='blue' />
    </div>
  )
}

export default ProgressLinearAuto
