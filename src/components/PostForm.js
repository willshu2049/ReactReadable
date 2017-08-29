import React from 'react'
import { Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { addPost, allCategories } from '../actions/actions'

class PostForm extends React.Component {

  componentDidMount(){
    this.props.allCategories()
  }

  renderInput(field){

    const { touched, error } = field.meta
    const className = `form-group ${touched && error ? 'has-danger' : ''}`

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          type='text'
          className='form-control'
          placeholder={field.placeholder}
          {...field.input}
          />
        <div className='form-control-feedback'>
          {touched ? error : ''}
        </div>
      </div>
    )
  }

  renderSelection(field){

    const { touched, error } = field.meta
    const className = `form-group ${touched && error ? 'has-danger' : ''}`

    return (
      <div className={className}>
        <label>{field.label}</label>
        <select
          {...field.input}
          value={field.input.value || ''}
          className='form-control'>
          <option disabled></option>
          {field.categories && field.categories.map( ele => {
            return (ele.name==='All') ? null : <option key={ele.name} value={ele.name}>{ele.name}</option>
          })}
        </select>
        <div className='form-control-feedback'>
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
      <div>
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
