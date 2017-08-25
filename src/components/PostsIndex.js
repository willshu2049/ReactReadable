import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import VoteButton from './VoteButton'

import { selectCategory, votePost, updateSortMethod } from '../actions/actions'
import { sortByVote, sortByDate} from '../utils/sort'

class PostsIndex extends React.Component {

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
          <select value={sortMethod} onChange={updateSortMethod}>
            <option value='voteScore'>Top Score</option>
            <option value='timestamp'>Most Recent</option>
          </select>
        </li>

        {posts.map( (post) => (
          <li key={post.id} className='list-group-item'>

            <Link className='post-detail' to='post-detail'><h4>{post.title}</h4></Link>

            <p><span>{(new Date(Number(post.timestamp))).toString().substr(0, 25)}</span> by <span>{post.author}</span></p>
            <p>{post.body}</p>
            <p>
              <scan>{post.category} </scan>
              <scan>{post.voteScore} </scan>
              <VoteButton id={post.id} option={'upVote'} onClickButton={votePost} />
              <VoteButton id={post.id} option={'downVote'} onClickButton={votePost} />
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
    votePost: (e) => dispatch(votePost(e.target.value, e.target.innerHTML)),
    updateSortMethod: (e) => dispatch(updateSortMethod(e.target.value))
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(PostsIndex);
