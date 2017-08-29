import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import PostContent from './PostContent'
import CommentsContent from './CommentsContent'
import VoteButton from './VoteButton'
import DeleteButton from './DeleteButton'

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
      <div className='post-detail'>
        <Link to='/' className='back-to-default'>Go Back</Link>
        <DeleteButton onClickButton={()=>this.onDeleteClick()}/>
        <h4>{post.title}</h4>
        <p><span>{(new Date(Number(post.timestamp))).toString().substr(0, 25)}</span> by <span>{post.author}</span></p>
        <p>{post.body}</p>
        <p>
          <span>{post.category} </span>
          <span>{post.voteScore} </span>
          <VoteButton id={post.id} option={'upVote'} onClickButton={votePost} />
          <VoteButton id={post.id} option={'downVote'} onClickButton={votePost} />
        </p>
      </div>
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
    votePost: (e) => dispatch(votePost(e.target.value, e.target.innerHTML))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
