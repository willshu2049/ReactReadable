import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import { Form, Modal, Button } from 'semantic-ui-react'

import { addComment, editComment } from '../../actions'


class CommentModal extends React.Component {

  state = {
    modalOpen: false
  }

  renderInput(field){
    const { touched, error } = field.meta
    const errorAttr = touched && error ? true : false

    return (
      <div>
        <Form.Input
          style={{width: 35.5+'em'}}
          type='text'
          error={errorAttr}
          placeholder={field.placeholder}
          {...field.input}
          />
        <div className='postForm-warning'>
          {touched ? error : ''}
        </div>
      </div>
    )
  }

  renderTextArea(field){
    const { touched, error } = field.meta
    const errorAttr = touched && error ? true : false

    // style={{width: 100+'px', height: 100+'px'}}
    return (
      <div>
        <Form.TextArea
          style={{width: 35.5+'em', minHeight: 20 +'em'}}
          autoHeight
          type='text'
          error={errorAttr}
          placeholder={field.placeholder}
          {...field.input}
          />
        <div  className='postForm-warning'>
          {touched ? error : ''}
        </div>
      </div>
    )
  }

  onModalOpen = () => {
    this.setState({modalOpen: true})
  }

  onModalClose = () => {
    this.setState({modalOpen: false})
  }

  onSubmit = values => {
    const { postId, commentId } = this.props
    if (commentId) {
      this.props.editComment(commentId, values, ()=>{
        this.setState({modalOpen: false})
      });
    } else {
      this.props.addComment(values, postId, ()=>{
        this.setState({modalOpen: false})
      });
    }
  }

  render () {
    const { handleSubmit, functionality } = this.props

    return (
      <Modal
        size='tiny'
        trigger={(functionality==='addComment') ?
          <Button size='mini' content='Add Comment' icon='add' color='blue' floated='right' onClick={this.onModalOpen} /> :
            <Button basic size='mini' color='blue' onClick={this.onModalOpen} icon='edit'/>}
        open={this.state.modalOpen}
        onClose={this.onModalClose}>
        <Modal.Header>Add a comment</Modal.Header>
        <Modal.Content>
          <Modal.Description>
              <Form onSubmit={handleSubmit(this.onSubmit)}>
                <Field
                  name='author'
                  component={this.renderInput}
                  placeholder='your username'
                  />
                <Field
                  name='body'
                  component={this.renderTextArea}
                  placeholder='your comment'
                  />
                <Button color='green' type='submit' icon='send' content=' Submit'/>
                <Button basic icon='undo' type='button' content=' Cancel' onClick={this.onModalClose}/>
              </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

function validate(values){
  const errors = {}
  if (!values.author){
    errors.author = '* Required'
  }
  if (!values.body){
    errors.body = '* Required'
  }
  return errors
}

export default connect(
  // mapStateToProps
  null,
  // mapDispatchToProps
  { addComment, editComment }
)(reduxForm({
    validate,
    enableReinitialize: true,
    // By default, the form data will be destroyed in the Redux store when the form is unmounted.
    // Therefore after submitting the first form, and re-opened the modal, the field would alway return 'undefined' instead of error, and the error message will not show up.
    // You can disable this by passing destroyOnUnmount: false.
    destroyOnUnmount: false,
  })(CommentModal)
);
