import React from 'react'
import './Overlay.scss'

interface IOverlay {
  show: boolean
}

const Overlay = ({ show = false }: IOverlay) => (show
  ? <div className="overlay" /> : null
)

export default Overlay
