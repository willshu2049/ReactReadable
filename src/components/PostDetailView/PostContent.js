import React from 'react'
import { Grid, Segment, Button, Statistic, Icon, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { fetchPost, votePost } from '../../actions'

class PostContent extends React.Component {

  render () {
    const { posts, votePost } = this.props
    const post=posts[this.props.match.params.postId]

    return (
      <Grid.Row>
        <Grid.Column width={2}></Grid.Column>

        <Grid.Column width={2}>
          <Segment basic style={{marginBottom: 0 + 'px', marginTop: 0 + 'em'}}>
            <Statistic horizontal value={post.voteScore} label='likes' style={{display: 'block'}} />
            <Button basic color='green' name={'upVote'} icon='like outline' value={post.id} onClick={(e, data)=>votePost(data.value, data.name)}/>
            <Button basic color='red' name={'downVote'} icon='dislike outline' value={post.id} onClick={(e, data)=>votePost(data.value, data.name)}/>
          </Segment>
        </Grid.Column>

        <Grid.Column verticalAlign='middle' width={10}>
          <Header as={'h1'} color='blue'>{post.title}</Header>
          <Segment padded size='big'>
            {post.body}
          </Segment>
          <p className='authorAndDate'>
            <Icon name='user'/>{post.author}<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <Icon name='clock'/>{(new Date(Number(post.timestamp))).toString().substr(0, 21)}<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span>Category: </span>
            <Button as={Link} to={`/${post.category}`} id={post.category} style={{width: 5 + 'em'}} compact>
              {post.category}
            </Button>
          </p>
        </Grid.Column>

        <Grid.Column width={2}></Grid.Column>
      </Grid.Row>
    )
  }
}

export default connect(
  // Do not use ownProps to convey only post here. Otherwise the post will not re-render when post state changed
  ({posts}) =>({posts}),
  { fetchPost, votePost }
)(PostContent);
