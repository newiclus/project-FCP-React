import React, { useState } from 'react'
import {
  Menu,
} from 'semantic-ui-react'
import { NavLink } from "react-router-dom"
import { Location } from 'history'

import Routes from '../../config/routes'
import Logout from './Logout'


const TabMenu = () => {
  const [activeItem, setActiveItem] = useState("")

  const oddEvent = (match:any, location:Location) => {
    setActiveItem(location.pathname)

    if (!match) {
      return false
    }

    const eventID = parseInt(match.params.eventID)
    return !isNaN(eventID) && eventID % 2 === 1
  }

  return (
    <Menu tabular className="tabmenu">
      <Menu.Item 
        name={Routes.REPORT}
        active={activeItem === Routes.REPORT}>
        <NavLink to={Routes.REPORT} isActive={oddEvent}>Reporte Diario</NavLink>
      </Menu.Item>
    
      <Menu.Item 
        name={Routes.NEWS_ADD}
        active={activeItem === Routes.NEWS_ADD}>
        <NavLink to={Routes.NEWS_ADD} isActive={oddEvent}>Noticias</NavLink>
      </Menu.Item>

      <Menu.Item 
        name={Routes.CAMPAIGN_EDIT}
        active={activeItem === Routes.CAMPAIGN_EDIT}>
        <NavLink to={Routes.CAMPAIGN_EDIT} isActive={oddEvent}>Campaña</NavLink>
      </Menu.Item>

      <Logout />
    </Menu>
  )
}

export default TabMenu