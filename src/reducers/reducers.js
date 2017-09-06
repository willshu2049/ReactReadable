import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import _ from 'lodash'

import { ALL_CATEGORIES,
  ALL_POSTS,
  SELECT_CATEGORY,
  VOTE_POST,
  POST_SORT_METHOD,
  ADD_POST,
  FETCH_POST,
  DELETE_POST,
  EDIT_POST,
  ALL_COMMENTS_OF_POST,
  VOTE_COMMENT,
  DELETE_COMMENT,
  ADD_COMMENT,
  EDIT_COMMENT,
  COMMENT_SORT_METHOD
} from '../actions/actions'

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
      return _.mapKeys(action.payload, 'id')
    case FETCH_POST:
      return {
        ...state,
        [action.payload.id]:action.payload
      }
    case SELECT_CATEGORY:
      return _.mapKeys(action.payload, 'id')
    case VOTE_POST:
      const { postId, option } = action
      return {
        ...state,
        [postId]:{
          ...state[postId],
          'voteScore': (option==='upVote') ? state[postId].voteScore+1 : state[postId].voteScore-1
        }
      }
      /* The sort() method sorts the elements of an array in place and returns the array.
          Therefore you need to use [...state] to avoid shallow comparison problem.
          However you need to use another state 'postSortMethod' to keep track of postSortMethod on the Main page.
          So to avoid redundance you may sort your list of posts locally when rendering. Below code is when you sort it in reducer
          ```
          case ORDER_BY:
            const orderOption=action.value;
          const newState1 = [...state].sort(function(a,b){
            const keyA = a[orderOption];
            const keyB = b[orderOption];
            return (keyA < keyB) ? -1 : (keyA === keyB) ? 0 : 1
          }).reverse();
          return newState1
          ```
      */
    case DELETE_POST:
      return {
        ...state,
        [action.postId]:{
          ...state[action.postId],
          'deleted': true
        }
      }
    case ADD_POST:
      return {
        ...state,
        [action.payload.id]: action.payload
      }
    case EDIT_POST:
      return {
        ...state,
        [action.payload.id]: action.payload
      }
    default:
      return state
  }
}

function postSortMethod(state='voteScore', action) {
  switch (action.type) {
    case POST_SORT_METHOD:
      return action.value
    default:
      return state
  }
}

function comments(state={}, action) {
  switch (action.type) {
    case ALL_COMMENTS_OF_POST:
      const incomingComments=_.mapKeys(action.payload, 'id')
      return {
        ...state,
        ...incomingComments
      }
    case VOTE_COMMENT:
      const { commentId, option } = action
      return {
        ...state,
        [commentId]:{
          ...state[commentId],
          'voteScore': (option==='upVote') ? state[commentId].voteScore+1 : state[commentId].voteScore-1
        }
      }
    case DELETE_COMMENT:
      return {
        ...state,
        [action.commentId]:{
          ...state[action.commentId],
          'deleted': true
        }
      }
    case ADD_COMMENT:
      return {
        ...state,
        [action.payload.id]: action.payload
      }
    case EDIT_COMMENT:
      return {
        ...state,
        [action.payload.id]: action.payload
      }
    default:
      return state
  }
}

function commentSortMethod(state='voteScore', action) {
  switch (action.type) {
    case COMMENT_SORT_METHOD:
      return action.value
    default:
      return state
  }
}

export default combineReducers({
  categories,
  activeCategory,
  posts,
  postSortMethod,
  form,
  comments,
  commentSortMethod
})
