import React from 'react'

import PostContent from './PostContent'
import CommentsContent from './CommentsContent'

function PostDetail(props) {
  return (
    <div className='post-detail'>
      <PostContent />
      <CommentsContent />
      <Link to='/' className='back-to-default'>Go Back</Link>
    </div>
  )
}

export default PostDetail;
