import React from 'react'
import { Grid } from 'semantic-ui-react'

import CategoriesIndex from './CategoriesIndex'
import PostsIndex from './PostsIndex'

class DefaultView extends React.Component {

  render () {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={1}></Grid.Column>
          <Grid.Column width={4}>
            <CategoriesIndex />
          </Grid.Column>
          <Grid.Column width={10}>
            <PostsIndex />
          </Grid.Column>
          <Grid.Column width={1}></Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default DefaultView;
