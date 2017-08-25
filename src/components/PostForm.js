import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import InputField from './InputField'

import { allCategories, addPost, inputChange, clearPostForm, categoryChange } from '../actions/actions'

class PostForm extends React.Component {

  componentDidMount(){
    this.props.allCategories()
  }

  onFormSubmit= (e) => {
    e.preventDefault()
    this.props.addPost(e)
    this.props.clearPostForm()
  }

  render () {
    const { categories } = this.props.categories
    const { inputChange, inputState, categoryChange } = this.props
    return (
      <div>
        <h3>Add a new Post</h3>
        <form onSubmit={this.onFormSubmit}>
          <InputField heading={'Post Title'} name={'title'} value={inputState.title} onInputChange={inputChange} placeholder={'Title'} option=''/>
          <InputField heading={'Username'} name={'author'} value={inputState.author} onInputChange={inputChange} placeholder={'your username'} option=''/>
          <div>
            <p>Category</p>
            <select
              name='category'
              value={inputState.category}
              onChange={ categoryChange }>
              <option disabled>Select category</option>
              {categories && categories.map( ele => {
                return (ele.name==='All') ? null : <option key={ele.name} value={ele.name}>{ele.name}</option>
              })}
            </select>
          </div>
          <InputField heading={'Post Body'} name={'body'} value={inputState.body} onInputChange={inputChange} placeholder={'Write something...'} option=''/>
          <div>
            <button type='submit'>Submit</button>
            <Link to='/' >Cancel</Link>
          </div>
        </form>
      </div>
    )
  }
}

function mapStateToProps({categories, inputState}) {
  return {
    categories,
    inputState
  }
}

function mapDispatchToProps(dispatch) {
  return {
    allCategories: () => dispatch(allCategories()),
    addPost: (e)=>dispatch(addPost(e.target)),
    inputChange: (e)=>dispatch(inputChange(e.target.name, e.target.value)),
    categoryChange: (e)=>dispatch(categoryChange(e.target.name, e.target.value)),
    clearPostForm: ()=>dispatch(clearPostForm()),
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(PostForm);
