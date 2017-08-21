import React from 'react'
import { Link } from 'react-router-dom'

import ListCategories from './ListCategories'
import ListPosts from './ListPosts'

class DefaultView extends React.Component {

  render () {
    return (
      <div className="App row">
        <ListCategories />
        <ListPosts />
        <div className='create-post'>
          <Link to='/create'>Create Post</Link>
        </div>
      </div>
    )
  }
}

export default DefaultView;
