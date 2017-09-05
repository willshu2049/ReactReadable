import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import CommentModal from './CommentModal'
import { Grid, Header, Button, Comment, Form, Divider } from 'semantic-ui-react'

import { allCommentsOfPost, voteComment, deleteComment } from '../../actions/actions'

class CommentsContent extends React.Component {

  componentDidMount(){
    const { postId } = this.props.match.params
    this.props.allCommentsOfPost(postId)
  }

  render () {
    const { postId } = this.props.match.params
    const { voteComment, deleteComment } = this.props
    let { comments } = this.props

    // unobjectify comments into an array
    comments=_.map(comments)

    // filter out all deleted comments
    comments=_.filter(comments, comment=>!comment.deleted)

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

              <Divider fitted></Divider>
            </div>

            { comments && comments.map( comment => (
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
  ({comments})=>({comments}),
  {allCommentsOfPost, voteComment, deleteComment}
)(CommentsContent);
