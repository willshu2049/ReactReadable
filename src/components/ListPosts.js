import React from 'react'
import { connect } from 'react-redux'

import { selectCategory, votePost, updateSortMethod } from '../actions/actions'
import { sortByVote, sortByDate} from '../utils/sort'

class ListPosts extends React.Component {

  // After page load, send an action to request for all posts
  componentDidMount() {
    this.props.allPosts('All')
  }

  render () {
    const { posts, votePost, sortMethod, updateSortMethod } = this.props

    // sort the posts locally in the component
    posts && (sortMethod === 'voteScore') ? posts.sort(sortByVote) : posts.sort(sortByDate)

    return (
      <ul className='list-posts list-group col-sm-8'>
        <li
          key='th-posts'
          className='th-posts list-group-item'>
          <span>Posts </span>
          <span>Sort By </span>
          <select value={sortMethod} onChange={(e)=>updateSortMethod(e.target.value)}>
            <option value='voteScore'>Top Score</option>
            <option value='timestamp'>Most Recent</option>
          </select>
        </li>
        {posts.map( (post) => (
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
                onClick={(e)=>votePost(e.target.value, e.target.innerHTML)}
                className='btn btn-secondary upVote'>
                upVote
              </button>
              <button
                value={post.id}
                onClick={(e)=>votePost(e.target.value, e.target.innerHTML)}
                className='btn btn-secondary downVote'>
                downVote
              </button>
              <span></span>
            </p>
          </li>
        ))}
      </ul>
    )
  }
}

function mapStateToProps({posts, sortMethod}){
  return {
    posts,
    sortMethod
  }
}

function mapDispatchToProps(dispatch){
  return {
    allPosts: (category) => dispatch(selectCategory(category)),
    votePost: (id, option) => dispatch(votePost(id, option)),
    updateSortMethod: (value) => dispatch(updateSortMethod(value))
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(ListPosts);
