import React from 'react'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'

import CategoriesIndex from './CategoriesIndex'
import PostsIndex from './PostsIndex'

import { allCategories, allPosts, selectCategory } from '../../actions'

class DefaultView extends React.Component {

  // After page load, send an action to request for all categories and posts
  componentDidMount() {
    this.props.allPosts()
    this.props.allCategories()
    this.props.selectCategory('All')
  }

  render () {
    return (
      <Grid stackable>
        <Grid.Row>
          <Grid.Column width={1}></Grid.Column>
          <Grid.Column width={3}>
            <CategoriesIndex />
          </Grid.Column>
          <Grid.Column width={11}>
            <PostsIndex />
          </Grid.Column>
          <Grid.Column width={1}></Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default connect(null, {allCategories, allPosts, selectCategory})(DefaultView);
