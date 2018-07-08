import React from 'react'
import { Link } from 'react-router-dom'
import { Menu, Icon, Button } from 'semantic-ui-react'

export default function Header() {
  return (
    <Menu fixed='top' size='large' className='menu'>
      <div className='header-icon-container'>
        <Icon name='book' size='large'/>
        <Link className='header-text' to='/'>Readable</Link>
      </div>
      <div className='header-contact-info'>
        <Button circular color='black' icon='github' as='a' href='https://github.com/willshu2049' style={{marginRight: 1 + 'em'}} />
        <Button circular color='twitter' icon='twitter' as='a' href='https://twitter.com/Studded_Wills72'/>
      </div>
    </Menu>
  )
}

// <Button circular color='black' as='a' href='https://github.com/willshu2049' style={{marginRight: 1 + 'em'}} animated>
//   <Button.Content visible>
//     <Icon name='github' />
//   </Button.Content>
//   <Button.Content hidden>
//     Github
//   </Button.Content>
// </Button>
// <Button circular color='twitter' as='a' href='https://twitter.com/Studded_Wills72' animated>
//   <Button.Content visible>
//     <Icon name='twitter' />
//   </Button.Content>
//   <Button.Content hidden>
//     Twitter
//   </Button.Content>
