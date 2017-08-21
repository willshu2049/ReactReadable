import React from 'react'
import { connect } from 'react-redux'

import { selectCategory, upVote } from '../actions/actions'

class ListPosts extends React.Component {

  // After page load, send an action to request for all posts
  componentDidMount() {
    this.props.getAllPosts('All')
  }

  handleSubmit(e) {
    console.log(e.target.innerHTML)
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
            <p><span>{Date(post.timestamp)}</span> by <span>{post.author}</span></p>
            <p>{post.body}</p>
            <div>
              <scan>{post.category} </scan>
              <scan>{post.voteScore} </scan>
              <form onSubmit={this.handleSubmit}>
                <button type="submit" value="upVote">upVote</button>
                <button type="submit" value="downVote">downVote</button>
              </form>
            </div>
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
    getAllPosts: (category) => dispatch(selectCategory(category))
    // upVote: (id, option) => dispatch(upVote(id, option))
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(ListPosts);
