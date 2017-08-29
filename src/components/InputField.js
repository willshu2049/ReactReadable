// This is the code for manually input states into redux

// The initial state or CLEAR_POST_FORM state can't be null, but can be empty string.
function inputState(state={title:'', author:'', category:'', body:''}, action) {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        // [...] is called computed property
        [action.name]: action.value
      }
    case CATEGORY_CHANGE:
      return {
        ...state,
        [action.name]: action.value
      }
    case CLEAR_POST_FORM:
      return {
        title:'', author:'', body:''
      }
    default:
      return state
  }
}

// actions
export function inputChange(name, value) {
  return {
    type: INPUT_CHANGE,
    name,
    value
  }
}

export function categoryChange(name, value) {
  return {
    type: CATEGORY_CHANGE,
    name,
    value
  }
}

export function clearPostForm() {
  return {
    type: CLEAR_POST_FORM,
  }
}

// inside the PostForm component
import InputField from './InputField'

onFormSubmit= (e) => {
  e.preventDefault()
  this.props.addPost(e)
  this.props.clearPostForm()
}

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

inputChange: (e)=>dispatch(inputChange(e.target.name, e.target.value)),
categoryChange: (e)=>dispatch(categoryChange(e.target.name, e.target.value)),
clearPostForm: ()=>dispatch(clearPostForm()),

// InputField Component
import React from 'react'

export default function InputField(props) {
  return (
    <div>
      <p>{props.heading}</p>
      <input
        name={props.name}
        value={props.value}
        onChange={ props.onInputChange }
        placeholder={props.placeholder}
        className={`form-control col-md-6 ${props.option}`} />
    </div>
  )
}
