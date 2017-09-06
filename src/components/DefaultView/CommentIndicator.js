import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Icon } from 'semantic-ui-react'

import { allCommentsOfPost } from '../../actions/actions'

class CommentIndicator extends React.Component {

  componentDidMount(){
    const { postId, allCommentsOfPost } = this.props
    allCommentsOfPost(postId)
  }

  render () {
    const { postId, comments } = this.props

    let commentIndicator = _.map(comments).filter(comment => comment.parentId===this.props.postId).length

    return (
      <span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Icon name='conversation'/>
        {commentIndicator}&nbsp;
        comment(s)
      </span>
    )
  }
}

export default connect(
  ({comments})=>({comments}),
  { allCommentsOfPost }
)(CommentIndicator);
