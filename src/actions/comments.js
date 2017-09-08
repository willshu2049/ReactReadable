import * as ReadableAPI from '../utils/ReadableAPI'
import { reset } from 'redux-form'

export const ALL_COMMENTS_OF_POST = 'ALL_COMMENTS_OF_POST'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const COMMENT_SORT_METHOD = 'COMMENT_SORT_METHOD'

export function allCommentsOfPost(postId) {
  const allCommentsOfPost = ReadableAPI.allCommentsOfPost(postId)
  return {
    type: ALL_COMMENTS_OF_POST,
    payload: allCommentsOfPost
  }
}

export function voteComment(commentId, option) {
  // update the state in the server
  ReadableAPI.voteComment(commentId, option)
  // send an action to update local state
  return {
    type: VOTE_COMMENT,
    commentId,
    option
  }
}

export function updateCommentSortMethod(value){
  return {
    type: COMMENT_SORT_METHOD,
    value
  }
}

export function deleteComment(commentId) {
  ReadableAPI.deleteComment(commentId)
  return {
    type: DELETE_COMMENT,
    commentId
  }
}

export function addComment(values, postId, callback){
  const commentId = Math.random().toString(36).substr(-8)
  // Date.now() produces the UTC time. Use UTC time solves "time zone" problem.
  const timestamp = Date.now()
  // update the state in the server. It seems after you go back the main page automatically updates to the new state. Is this the correct way of doing things?
  const request = ReadableAPI.addComment(commentId, timestamp, values.body, values.author, postId);
  // redux-thunk here: return a function, which returns a promise to the middleware redux-promise which return an object to the reducer. At the same time, call the callback.
  return (dispatch) => {
    request.then((data)=>{
      dispatch({type: ADD_COMMENT, payload: data})
      dispatch(reset('AddCommentForm'))
      callback()
    })
  }
}

export function editComment(commentId, values, callback){
  // console.log(values)
  const request = ReadableAPI.editComment(commentId, values.timestamp, values.body)
  return (dispatch) => {
    request.then((data)=>{
      dispatch({type: EDIT_COMMENT, payload: data})
      // console.log(data)
      callback()
    })
  }
}
