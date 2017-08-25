import React from 'react'
import { Link } from 'react-router-dom'

import CategoriesIndex from './CategoriesIndex'
import PostsIndex from './PostsIndex'

class DefaultView extends React.Component {

  render () {
    return (
      <div className="App row">
        <CategoriesIndex />
        <PostsIndex />
        <div className='create-post'>
          <Link to='/create'>Create Post</Link>
        </div>
      </div>
    )
  }
}

export default DefaultView;
