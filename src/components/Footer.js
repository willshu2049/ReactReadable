import React from 'react'
import { Segment, Button } from 'semantic-ui-react'

export default function Footer() {
  return (
    <Segment textAlign='center' className='footer-container'>
      <div className='footer-content'>
        <p>Readable by Will Shu.</p>
        <p>E-mail: willshu2049@gmail.com</p>
      </div>
      <div className='footer-contact-info'>
        <Button color='black' icon='github' label='github' as='a' href='https://github.com/willshu2049' style={{marginRight: 1 + 'em'}} />
        <Button color='twitter' icon='twitter' label='twitter' as='a' href='https://twitter.com/Studded_Wills72'/>
      </div>
    </Segment>
  )
}

// <Button basic color='black' as='a' href='https://github.com/willshu2049' animated>
//   <Button.Content visible>
//     Github
//   </Button.Content>
//   <Button.Content hidden>
//     <Icon name='github' />
//   </Button.Content>
// </Button>
// <br />
// <Button basic color='blue' as='a' href='https://twitter.com/Studded_Wills72' animated>
//   <Button.Content visible>
//     Twitter
//   </Button.Content>
//   <Button.Content hidden>
//     <Icon name='twitter' />
//   </Button.Content>
// </Button>
