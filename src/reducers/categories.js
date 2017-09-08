import {
  ALL_CATEGORIES,
  SELECT_CATEGORY,
} from '../actions'

export function categories(state={categories:[]}, action) {
  switch (action.type) {
    case ALL_CATEGORIES:
      return action.payload
    default:
      return state
  }
}

export function activeCategory(state='All', action) {
  switch (action.type) {
    case SELECT_CATEGORY:
      return action.meta
    default:
      return state
  }
}
