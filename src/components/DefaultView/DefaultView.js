import React from 'react'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'

import CategoriesIndex from './CategoriesIndex'
import PostsIndex from './PostsIndex'

import { allCategories, allPosts } from '../../actions/actions'

class DefaultView extends React.Component {

  // After page load, send an action to request for all categories and posts
  componentDidMount() {
    this.props.allPosts()
    this.props.allCategories()
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

function mapDispatchToProps(dispatch){
  return {
    allCategories: () => dispatch(allCategories()),
    allPosts: () => dispatch(allPosts()),
  }
}

export default connect(null, mapDispatchToProps)(DefaultView);
