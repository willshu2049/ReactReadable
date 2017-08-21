import { combineReducers } from 'redux'
import { GET_ALL_CATEGORIES, SELECT_CATEGORY } from '../actions/actions'

function categories(state=[], action) {
  switch (action.type) {
    case GET_ALL_CATEGORIES:
      return action.payload
    default:
      return state
  }
}

function posts(state=[], action) {
  switch (action.type) {
    case SELECT_CATEGORY:
      return action.payload
    default:
      return state
  }
}

export default combineReducers({
  categories,
  posts,
})
