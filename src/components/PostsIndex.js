import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import _ from 'lodash'

import VoteButton from './VoteButton'

import { allPosts, votePost, updateSortMethod } from '../actions/actions'
import { sortByVote, sortByDate} from '../utils/sort'

class PostsIndex extends React.Component {

  // After page load, send an action to request for all posts
  componentDidMount() {
    this.props.allPosts()
  }

  render () {
    const { votePost, sortMethod, updateSortMethod } = this.props
    let { posts } = this.props

    // unobjectify posts into an array
    posts=_.map(posts)

    // delete all deleted posts
    posts=_.filter(posts, post=>!post.deleted)

    // sort the posts locally in the component
    posts && (sortMethod === 'voteScore') ? posts.sort(sortByVote) : posts.sort(sortByDate)

    return (
      <ul className='list-posts list-group col-md-8'>

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

            <Link className='post-detail' to={`/posts/${post.id}`}><h4>{post.title}</h4></Link>

            <p><span>{(new Date(Number(post.timestamp))).toString().substr(0, 25)}</span> by <span>{post.author}</span></p>
            <p>{post.body}</p>
            <p>
              <span>{post.category} </span>
              <span>{post.voteScore} </span>
              <VoteButton id={post.id} option={'upVote'} onClickButton={votePost} />
              <VoteButton id={post.id} option={'downVote'} onClickButton={votePost} />
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
    allPosts: () => dispatch(allPosts()),
    votePost: (e) => dispatch(votePost(e.target.value, e.target.innerHTML)),
    updateSortMethod: (e) => dispatch(updateSortMethod(e.target.value))
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(PostsIndex);
