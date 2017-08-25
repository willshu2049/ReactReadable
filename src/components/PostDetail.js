import React from 'react'
import { Link } from 'react-router-dom'

import PostContent from './PostContent'
import CommentsContent from './CommentsContent'

class PostDetail extends React.Component {
  render() {
    return (
      <div className='post-detail'>
        <PostContent />
        <CommentsContent />
        <Link to='/' className='back-to-default'>Go Back</Link>
      </div>
    )
  }
}

export default PostDetail;
