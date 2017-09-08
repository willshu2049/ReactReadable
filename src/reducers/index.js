import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import { categories, activeCategory } from './categories'
import { posts, postSortMethod } from './posts'
import { comments, commentSortMethod } from './comments'

export default combineReducers({
  categories,
  activeCategory,
  posts,
  postSortMethod,
  form,
  comments,
  commentSortMethod
})
