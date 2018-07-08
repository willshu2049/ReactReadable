import _ from 'lodash'

import {
  ALL_COMMENTS_OF_POST,
  VOTE_COMMENT,
  DELETE_COMMENT,
  ADD_COMMENT,
  EDIT_COMMENT,
  COMMENT_SORT_METHOD
} from '../actions/types'

export function comments(state={}, action) {
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

export function commentSortMethod(state='voteScore', action) {
  switch (action.type) {
    case COMMENT_SORT_METHOD:
      return action.value
    default:
      return state
  }
}
