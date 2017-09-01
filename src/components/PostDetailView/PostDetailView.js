import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button, Grid, Segment, Statistic, Icon, Header } from 'semantic-ui-react'

import PostContent from './PostContent'
import CommentsContent from './CommentsContent'

import { fetchPost, votePost, deletePost, allCommentsOfPost } from '../../actions/actions'

class PostDetail extends React.Component {

  componentDidMount(){
    // match is passed into PostDetail as props by react-router-dom. It contains all the variables in the url.
    const { id }=this.props.match.params
    // check to see if there is any state
    if (Object.keys(this.props.posts).length === 0){
      this.props.fetchPost(id)
    }
    this.props.allCommentsOfPost(id)
  }

  onDeleteClick = () => {
    const {id} = this.props.match.params
    this.props.deletePost(id, ()=>{
      this.props.history.push('/')
    })
  }

  onEditClick = () => {
    const {id} = this.props.match.params
    this.props.history.push(`/edit/post/${id}`)
  }

  render() {
    const { posts, votePost } = this.props
    const post = posts[this.props.match.params.id]

    if (!post) {
      return <div>Loading...</div>
    }

    return (
      <Grid stackable>
        <Grid.Row>
          <Grid.Column width={2}></Grid.Column>
          <Grid.Column width={8}>
            <Button basic as={Link} to='/' icon='caret left' content='Back' color='green' />
          </Grid.Column>
          <Grid.Column style={{display: 'inline-block'}} width={6}>
            <Button basic color='red' onClick={()=>this.onDeleteClick()} icon='delete' content='Delete'/>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <Button basic color='blue' onClick={()=>this.onEditClick()} icon='edit' content='Edit'/>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={2}></Grid.Column>
          <Segment basic style={{marginBottom: 0 + 'px', marginTop: 0 + 'em'}}>
            <Statistic horizontal value={post.voteScore} label='likes' style={{display: 'block'}} />
            <Button basic color='green' name={'upVote'} icon='like outline' value={post.id} onClick={(e, data)=>votePost(e, data)}/>
            <Button basic color='red' name={'downVote'} icon='dislike outline' value={post.id} onClick={(e, data)=>votePost(e, data)}/>
          </Segment>

          <Grid.Column verticalAlign='middle' width={10}>
            <Header as={'h1'} color='blue'>{post.title}</Header>
            <Segment padded size='large'>
              {post.body}
            </Segment>
            <p className='post-top-row'>
              <Icon name='user'/>{post.author}<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <Icon name='clock'/>{(new Date(Number(post.timestamp))).toString().substr(0, 21)}<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <span>Category: </span>
              <Button
                as={Link}
                to={`/category/${post.category}`}
                id={post.category}
                onClick={(e)=>this.onClickCategory(e)}
                style={{width: 5 + 'em'}}
                compact>
                {post.category}
              </Button>
            </p>
          </Grid.Column>

          <Grid.Column width={2}></Grid.Column>
        </Grid.Row>
      </Grid>

    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    fetchPost: (id) => dispatch(fetchPost(id)),
    deletePost: (id, callback) => dispatch(deletePost(id, callback)),
    allCommentsOfPost: (id) => dispatch(allCommentsOfPost(id)),
    votePost: (e, data) => dispatch(votePost(data.value, data.name)),
  }
}

export default connect(({posts, comments}) =>({posts, comments}), mapDispatchToProps)(PostDetail);
