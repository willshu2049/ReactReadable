import React from 'react'
import { Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { Input, Dropdown } from 'semantic-ui-react'

import { addPost, allCategories } from '../actions/actions'

class PostForm extends React.Component {

  componentDidMount(){
    this.props.allCategories()
  }

  renderInput(field){

    const { touched, error } = field.meta
    const errorAttr = touched && error ? true : false

    return (
      <div>
        <Input
          type='text'
          label={field.label}
          error={errorAttr}
          placeholder={field.placeholder}
          {...field.input}
          />
        <div>
          {touched ? error : ''}
        </div>
      </div>
    )
  }

  renderSelection(field){

    const { touched, error } = field.meta
    const errorAttr = touched && error ? true : false
    const options = field.categories && field.categories.filter( ele => ele.name !== 'All').map( ele => {
      ele["key"] = ele.path
      ele["text"] = ele.path
      ele["value"] = ele.path
      delete ele.path
      delete ele.name
      return ele
    })
    console.log(options)

    return (
      <div>
        <Dropdown
          selection
          label={field.label}
          options={options}
          placeholder='Select Category'
          error={errorAttr}
          >
        </Dropdown>
        <div>
          {touched ? error : ''}
        </div>
      </div>
    )
  }

  onSubmit (values) {
    this.props.addPost(values, ()=>{
      this.props.history.push('/');
    });
  }

  render () {
    const { handleSubmit } = this.props
    const { categories } = this.props.categories

    return (
      <div className='post-form'>
        <h3>Add a new Post</h3>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
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
            component={this.renderInput}
            label='Message'
            placeholder='Write something...'
            />
          <button type='submit' className='btn btn-primary'>Submit</button>
          <Link to='/' className='btn btn-danger'>Cancel</Link>
        </form>
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

function mapStateToProps({categories}){
  return {
    categories
  }
}

export default reduxForm({
  validate,
  form: 'AddPost'
})(
  connect(mapStateToProps, {allCategories, addPost})(PostForm)
);
