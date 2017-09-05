import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Grid, Button } from 'semantic-ui-react'

import { deletePost } from '../../actions/actions'

class Controls extends React.Component {

  onDeleteClick = () => {
    this.props.deletePost(this.props.match.params.postId, ()=>{
      this.props.history.push('/')
    })
  }

  onEditClick = () => {
    this.props.history.push(`/edit/post/${this.props.match.params.postId}`)
  }

  render () {
    return (
      <Grid.Row>
        <Grid.Column width={2}></Grid.Column>
        <Grid.Column width={3}>
          <Button basic as={Link} to='/' icon='caret left' content='Back' color='green' />
        </Grid.Column>
        <Grid.Column style={{display: 'inline-block'}} floated='right' width={5}>
          <Button basic color='red' onClick={()=>this.onDeleteClick()} icon='delete' content='Delete'/>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <Button basic color='blue' onClick={()=>this.onEditClick()} icon='edit' content='Edit'/>
        </Grid.Column>
      </Grid.Row>
    )
  }
}

export default connect(
  null,
  { deletePost }
)(Controls);
