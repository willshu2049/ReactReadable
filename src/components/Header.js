import React from 'react'
import { Menu, Icon } from 'semantic-ui-react'

export default function Header() {
  return (
    <Menu fixed='top' size='large'>
      <div className='icon-container'>
        <Icon name='book' size='large'/>
        <div className='header-text'>Readable</div>
      </div>
    </Menu>
  )
}
