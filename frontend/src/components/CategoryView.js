import React from 'react'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'

import CategoriesIndex from './DefaultView/CategoriesIndex'
import PostsIndex from './DefaultView/PostsIndex'

import { allCategories, selectCategory } from '../actions'

class DefaultView extends React.Component {

  // After page load, send an action to request for all categories but specific posts
  componentDidMount() {
    const { category }=this.props.match.params

    this.props.allCategories()
    this.props.selectCategory(category)
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
            <PostsIndex categoryQuery={this.props.match.params.category}/>
          </Grid.Column>
          <Grid.Column width={1}></Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default connect(null, {allCategories, selectCategory})(DefaultView);
