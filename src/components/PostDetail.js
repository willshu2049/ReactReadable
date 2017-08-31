import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button, Grid } from 'semantic-ui-react'

import PostContent from './PostContent'
import CommentsContent from './CommentsContent'

import { fetchPost, votePost, deletePost } from '../actions/actions'

class PostDetail extends React.Component {

  componentDidMount(){
    // check to see if there is any state
    if (Object.keys(this.props.posts).length === 0){
      // match is passed into PostDetail as props by react-router-dom. It contains all the variables in the url.
      const { id }=this.props.match.params
      this.props.fetchPost(id)
    }
  }

  onDeleteClick = () => {
    const {id} = this.props.match.params
    this.props.deletePost(id, ()=>{
      this.props.history.push('/')
    })
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
          <Grid.Column width={1}></Grid.Column>
          <Grid.Column width={14}>
            <div className='post-detail'>
              <Link to='/' className='back-to-default'>Go Back</Link>
              <Button onClick={()=>this.onDeleteClick()} icon='delete' content='Delete'/>
              <h4>{post.title}</h4>
              <p><span>{(new Date(Number(post.timestamp))).toString().substr(0, 25)}</span> by <span>{post.author}</span></p>
              <p>{post.body}</p>
              <p>
                <span>{post.category} </span>
                <span>{post.voteScore} </span>
                <Button basic color='green' name={'upVote'} icon='like outline' value={post.id} onClick={(e, data)=>votePost(e, data)}/>
                <Button basic color='red' name={'downVote'} icon='dislike outline' value={post.id} onClick={(e, data)=>votePost(e, data)}/>
              </p>
            </div>
          </Grid.Column>
          <Grid.Column width={1}></Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

function mapStateToProps({posts}) {
  return {
    posts
  }
}

function mapDispatchToProps(dispatch){
  return {
    fetchPost: (id) => dispatch(fetchPost(id)),
    deletePost: (id, callback) => dispatch(deletePost(id, callback)),
    votePost: (e, data) => dispatch(votePost(data.value, data.name))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
