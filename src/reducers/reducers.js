import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import _ from 'lodash'

import { ALL_CATEGORIES, ALL_POSTS, SELECT_CATEGORY, VOTE, ALL_COMMENTS_OF_POST, SORT_METHOD, ADD_POST, FETCH_POST, DELETE_POST } from '../actions/actions'

function categories(state={categories:[]}, action) {
  switch (action.type) {
    case ALL_CATEGORIES:
      return action.payload
    default:
      return state
  }
}

function activeCategory(state='All', action) {
  switch (action.type) {
    case SELECT_CATEGORY:
      return action.meta
    default:
      return state
  }
}

function posts(state={}, action) {
  switch (action.type) {
    case ALL_POSTS:
    console.log(action.payload)
      return _.mapKeys(action.payload, 'id')
    case FETCH_POST:
      return {
        ...state,
        [action.payload.id]:action.payload
      }
    case SELECT_CATEGORY:
      return _.mapKeys(action.payload, 'id')
    case VOTE:
      const newStateArray=_.map(state)
      return _.mapKeys(newStateArray.map( ele => {
        if(ele.id === action.id){
          (action.option === 'upVote') ? ele.voteScore++ : ele.voteScore--
        }
        return ele
      }), 'id')
      /* The sort() method sorts the elements of an array in place and returns the array.
          Therefore you need to use [...state] to avoid shallow comparison problem.
          However you need to use another state 'sortMethod' to keep track of sortMethod on the Main page.
          So to avoid redundance you may sort your list of posts locally when rendering. Below code is when you sort it in reducer
          ```
          case ORDER_BY:
            const orderOption=action.value;
          const newState1 = [...state].sort(function(a,b){
            const keyA = a[orderOption];
            const keyB = b[orderOption];
            return (keyA < keyB) ? -1 : (keyA === keyB) ? 0 : 1
          }).reverse();
          console.log(newState1)
          return newState1
          ```
      */
    case ADD_POST:
      return state
    case DELETE_POST:
      return state
    default:
      return state
  }
}

function comments(state=[], action) {
  switch (action.type) {
    case ALL_COMMENTS_OF_POST:
      return
    default:
      return state
  }
}

function sortMethod(state='voteScore', action) {
  switch (action.type) {
    case SORT_METHOD:
      return action.value
    default:
      return state
  }
}

export default combineReducers({
  categories,
  activeCategory,
  posts,
  sortMethod,
  form
})
