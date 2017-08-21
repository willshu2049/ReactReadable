import React from 'react'
import { connect } from 'react-redux'

import { selectCategory, voteScore } from '../actions/actions'

class ListPosts extends React.Component {

  // After page load, send an action to request for all posts
  componentDidMount() {
    this.props.getAllPosts('All')
  }

  handleVote(e) {
    this.props.voteScore(e.target.value, e.target.innerHTML)
  }

  render () {
    const { posts} = this.props
    return (
      <ul className='list-posts list-group col-sm-8'>
        {
          /* You have to use categories && because fetching Categories from remote server is async,
          the very first time component renders, `categories` is null/undefined(should've set it to empty array).
          After data gets back from server, everything will render.*/
        }
        <li key='th-posts' className='th-posts list-group-item'>Posts</li>
        {/*
        */}
        {posts && posts.map( (post) => (
          <li
            key={post.id}
            className='list-group-item'>
            <h4>{post.title}</h4>
            <p><span>{post.timestamp}</span> by <span>{post.author}</span></p>
            <p>{post.body}</p>
            <p>
              <scan>{post.category} </scan>
              <scan>{post.voteScore} </scan>
              <button
                value={post.id}
                onClick={(e)=>this.handleVote(e)}
                className='btn btn-secondary upVote'>
                upVote
              </button>
              <button
                value={post.id}
                onClick={(e)=>this.handleVote(e)}
                className='btn btn-secondary downVote'>
                downVote
              </button>
            </p>
          </li>
        ))}
      </ul>
    )
  }
}

function mapStateToProps({posts}){
  return {
    posts,
  }
}

function mapDispatchToProps(dispatch){
  return {
    getAllPosts: (category) => dispatch(selectCategory(category)),
    voteScore: (id, option) => dispatch(voteScore(id, option))
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(ListPosts);
