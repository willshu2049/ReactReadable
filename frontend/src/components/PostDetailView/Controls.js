import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Grid, Button } from 'semantic-ui-react'

import { deletePost } from '../../actions'

class Controls extends React.Component {

  onDeleteClick = () => {
    this.props.deletePost(this.props.match.params.postId, ()=>{
      this.props.history.push('/')
    })
  }

  render () {
    return (
      <Grid.Row>
        <Grid.Column width={2}></Grid.Column>
        <Grid.Column width={3}>
          <Button as={Link} to={ (this.props.match.params.categoryQuery) ? `/${this.props.match.params.categoryQuery}` : '/'} basic icon='caret left' content='Back' color='green' />
        </Grid.Column>
        <Grid.Column style={{display: 'inline-block'}} floated='right' width={5}>
          <Button basic color='red' onClick={()=>this.onDeleteClick()} icon='delete' content='Delete'/>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <Button as={Link} to={`/edit/${this.props.match.params.category}/${this.props.match.params.postId}`} basic icon='edit' content='Edit' color='blue' />
        </Grid.Column>
      </Grid.Row>
    )
  }
}

export default connect(
  null,
  { deletePost }
)(Controls);
