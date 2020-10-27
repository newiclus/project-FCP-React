import React from 'react'
import TabMenu from './TabMenu'
import {
  Header,
  Segment,
} from 'semantic-ui-react'

import './MainLayout.scss'

const MainLayout = (props: any) => {
  return (
    <section>
      <Segment className="branding">
        <Header as="h3" className="branding__title">Administrador de sección seguros URPI</Header>
      </Segment>
      {!props.noMenu && (
        <aside className="content-menu">
          <TabMenu />
        </aside>
      )}
      <Segment basic className="wrapper">
        <section className="main-layout">
          {props.children}
        </section>
      </Segment>
    </section>
  )
}

export default MainLayout