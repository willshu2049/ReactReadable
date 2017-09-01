import React from 'react'

class PostContent extends React.Component {
  render () {
    const { post } = this.props
    return (
      <div className='post-content'>
        <div>{post.title}</div>
        <div>{post.voteScore}</div>
        <div>{post.author}</div>
        <div>{post.timestamp}</div>
        <div>{post.body}</div>
      </div>
    )
  }
}

export default PostContent;
