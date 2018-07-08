import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import CommentModal from './CommentModal'
import { Grid, Header, Button, Comment, Form, Divider } from 'semantic-ui-react'

import { allCommentsOfPost, voteComment, deleteComment, updateCommentSortMethod } from '../../actions'
import { sortByVote, sortByDate } from '../../utils/sort'

class CommentsContent extends React.Component {

  componentDidMount(){
    const { postId } = this.props.match.params
    this.props.allCommentsOfPost(postId)
  }

  render () {
    const { postId } = this.props.match.params
    const { comments, voteComment, deleteComment, commentSortMethod, updateCommentSortMethod } = this.props

    // unobjectify comments into an array, and through filtering keep all non-deleted comments and same-parentId comments
    let commentsFiltered =_.filter(_.map(comments), comment=>!comment.deleted && comment.parentId===postId)

    // sort the postsSorted locally in the component
    commentsFiltered && (commentSortMethod === 'voteScore') ? commentsFiltered.sort(sortByVote) : commentsFiltered.sort(sortByDate)

    return (
      <Grid.Row>
        <Grid.Column width={2}></Grid.Column>
        <Grid.Column width={2}></Grid.Column>

        <Grid.Column width={10}>
          <Comment.Group>
            <div>
              <Header as='h2' style={{display: 'inline-block', marginRight: 1 + 'em', marginTop: 0 + 'em', marginBottom: 0 + 'em'}}>
                Comments
              </Header>

              <CommentModal postId={postId} functionality='addComment' form={`AddCommentForm`} initialValues={null}/>

              <Form
                style={{display: 'inline-block', width: 8 + 'em', height: 2 +'em'}}
                >
                <select
                  value={commentSortMethod}
                  onChange={(e)=>updateCommentSortMethod(e.target.value)}
                  >
                  <option value='voteScore'>Top Score</option>
                  <option value='timestamp'>Most Recent</option>
                </select>
              </Form>

              <Divider fitted></Divider>
            </div>

            { commentsFiltered && commentsFiltered.map( comment => (
              <Comment key={comment.id}>
                <Comment.Content>
                  <Comment.Author as='a'>{comment.author}</Comment.Author>

                  <Comment.Metadata>
                    <div>{(new Date(Number(comment.timestamp))).toString().substr(0, 21)}</div>
                    <Button basic size='mini' color='red' value={comment.id} onClick={(e, data)=>deleteComment(data.value)} icon='delete'/>
                    <CommentModal commentId={comment.id} functionality='editComment' form={`EditCommentForm_${comment.id}`} initialValues={comment}/>
                  </Comment.Metadata>

                  <Comment.Text>{comment.body}</Comment.Text>

                  <Comment.Metadata>
                    <div>{comment.voteScore} likes</div>
                    <Button basic size='mini' color='green' name={'upVote'} icon='like outline' value={comment.id} onClick={(e, data)=>voteComment(data.value, data.name)}/>
                    <Button basic size='mini' color='red' name={'downVote'} icon='dislike outline' value={comment.id} onClick={(e, data)=>voteComment(data.value, data.name)}/>
                  </Comment.Metadata>

                </Comment.Content>
              </Comment>
            ))}

            <Form reply>

            </Form>
          </Comment.Group>
        </Grid.Column>

        <Grid.Column width={2}></Grid.Column>

      </Grid.Row>
    )
  }
}

export default connect(
  ({comments, commentSortMethod})=>({comments, commentSortMethod}),
  {allCommentsOfPost, voteComment, deleteComment, updateCommentSortMethod}
)(CommentsContent);
