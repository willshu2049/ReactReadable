import React from 'react'
import { Grid } from 'semantic-ui-react'

import Controls from './Controls'
import PostContent from './PostContent'
import CommentsContent from './CommentsContent'

function PostDetailView(props) {
  const { match, history } = props

  return (
    <Grid stackable>
      <Controls match={match} history={history} />
      <PostContent match={match} history={history} />
      <CommentsContent match={match} />
    </Grid>
  )
}

export default PostDetailView;
