import React, { memo } from 'react'
import { List, Button } from 'semantic-ui-react'

import { INews, IListNews } from '../NewsInterfaces'
import './ListNews.scss'

const ListNews = memo(({ items, onEditButton }:IListNews) => {
  const handleClickEdit = (event:any, data:any) => {
    onEditButton(data.id)
  }

  return (
    <List divided verticalAlign='middle'>
      {items.map((item:INews) => 
        <List.Item key={item.id} className="newsItem">
          <List.Content floated='right'>
            <Button 
              primary
              onClick={handleClickEdit}
              size="mini" 
              id={item.id}
            >
              Editar
            </Button>
          </List.Content>
          <List.Content>
            <List.Header>{item.title}</List.Header>
            <List.Description>{item.source} - {item.month}</List.Description>
          </List.Content>
        </List.Item>
      )}
    </List>
  )
})

export default ListNews