import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { Form, Button} from 'semantic-ui-react'

import { addPost, allCategories, fetchPost, editPost } from '../actions'

class PostForm extends React.Component {

  componentDidMount(){
    const { id } = this.props.match.params
    this.props.allCategories()
    if (id) {
      this.props.fetchPost(id)
    }
  }

  renderInput(field){
    const { touched, error } = field.meta
    const errorAttr = touched && error ? true : false

    return (
      <div>
        <Form.Input
          style={{width: 40+'em'}}
          type='text'
          label={field.label}
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

  renderSelection(field){
    const { touched, error } = field.meta
    // error is an invalid props on <select> tab.
    // const errorAttr = touched && error ? true : false

    // Non-semantic-ui way of constructing the dropdown
    return (
      <div>
        <label><b>{field.label}</b></label>
        <select
          {...field.input}
          value={field.input.value || ''}
          style={{width: 40 + 'em', height: 2.5 +'em', marginBottom: 1 + 'em'}}
          >
          <option disabled></option>
          {field.categories && field.categories.map( ele => {
            return (ele.name==='All') ? null : <option key={ele.name} value={ele.name}>{ele.name}</option>
          })}
        </select>
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
          style={{width: 40+'em', minHeight: 20 +'em'}}
          autoHeight
          type='text'
          label={field.label}
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

  // onSubmit function takes in a parameter: values. Here you are doing destructuring.
  onSubmit = ({title, body, author, category}) => {
    const { cat, id } = this.props.match.params
    if (id) {
      this.props.editPost(id, title, body, ()=>{
        this.props.history.push(`/${cat}/${id}/${cat}`);
      });
    } else {
      this.props.addPost(title, body, author, category, ()=>{
        this.props.history.push('/');
      });
    }
  }

  render () {
    const { handleSubmit } = this.props
    const { categories } = this.props.categories
    const { cat, id } = this.props.match.params

    return (
      <div className='post-form'>
        <h3>Add a new Post</h3>
        <Form onSubmit={handleSubmit(this.onSubmit)}>
          <Field
            name='category'
            component={this.renderSelection}
            label='Select Category '
            categories={categories}
            />
          <Field
            name='title'
            component={this.renderInput}
            label='Post Title'
            placeholder='title'
            />
          <Field
            name='author'
            component={this.renderInput}
            label='Username'
            placeholder='your username'
            />
          <Field
            name='body'
            component={this.renderTextArea}
            label='Message'
            placeholder='Write something...'
            />
          <Button color='green' type='submit' icon='send' content=' Submit'/>
          <Button as={Link} basic to={ (id) ? `/${cat}/${id}/${cat}` : '/' } icon='undo' content=' Cancel' />
        </Form>
      </div>
    )
  }
}

function validate(values){
  const errors = {}
  if (!values.category){
    errors.category = '* Required'
  }
  if (!values.title){
    errors.title = '* Required'
  }
  if (!values.author){
    errors.author = '* Required'
  }
  if (!values.body){
    errors.body = '* Required'
  }
  return errors
}

/*
 * You can use a simplified form in the connect function instead of the code block below.
 * One benefit of the simplified form is that:
 * you don't even have to specify the parameters that you will pass into the methods as long as you don't modify them
 */

// function mapDispatchToProps(dispatch){
//   return {
//     allCategories: () => dispatch(allCategories()),
//     addPost: (values, callback) => dispatch(addPost(values, callback))
//   }
// }

export default connect(
  // mapStateToProps
  ({categories, posts}, ownProps) => ({
    categories,
    initialValues: posts[ownProps.match.params.id]}),
  // mapDispatchToProps
  { allCategories, addPost, fetchPost, editPost }
)(reduxForm({
    validate,
    enableReinitialize : true,
    form: 'thePostForm'
  })(PostForm)
);
