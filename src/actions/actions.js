import * as ReadableAPI from '../utils/ReadableAPI'
import { reset } from 'redux-form'

export const ALL_CATEGORIES = 'ALL_CATEGORIES'
export const SELECT_CATEGORY = 'SELECT_CATEGORY'
export const VOTE_POST = 'VOTE_POST'
export const SORT_METHOD = 'SORT_METHOD'
export const ADD_POST = 'ADD_POST'
export const ALL_POSTS = 'ALL_POSTS'
export const FETCH_POST = 'FETCH_POST'
export const DELETE_POST = 'DELETE_POST'
export const EDIT_POST = 'EDIT_POST'
export const ALL_COMMENTS_OF_POST = 'ALL_COMMENTS_OF_POST'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'

export function allCategories() {
  const allCategories = ReadableAPI.allCategories()
  return {
    type: ALL_CATEGORIES,
    payload: allCategories
  }
}

export function allPosts() {
  const allPosts = ReadableAPI.allPosts()
  return {
    type: ALL_POSTS,
    payload: allPosts
  }
}

export function selectCategory(category) {
  const postsOfCategory = (category==='All')? ReadableAPI.allPosts(): ReadableAPI.postsOfCategory(category)
  return {
    type: SELECT_CATEGORY,
    // redux-promise checks if an action has a payload and then if the payload is a promise. so you can only use 'payload' as key here
    payload: postsOfCategory,
    // https://github.com/acdlite/flux-standard-action
    meta: category
  }
}

export function votePost(postId, option) {
  // update the state in the server
  ReadableAPI.votePost(postId, option)
  // send an action to update local state
  return {
    type: VOTE_POST,
    postId,
    option
  }
}

export function updateSortMethod(value) {
  return {
    type: SORT_METHOD,
    value
  }
}

export function addPost(title, body, author, category, callback) {
  const postId = Math.random().toString(36).substr(-8)
  // Date.now() produces the UTC time. Use UTC time solves "time zone" problem.
  const timestamp = Date.now()
  // update the state in the server. It seems after you go back the main page automatically updates to the new state. Is this the correct way of doing things?
  const request = ReadableAPI.addPost(postId, timestamp, title, body, author, category);
  return (dispatch) => {
    request.then((data)=>{
      dispatch({type: ADD_POST, payload: data})
      callback()
    })
  }
}

export function editPost(postId, title, body, callback) {
  const request = ReadableAPI.editPost(postId, title, body);
  return (dispatch)=>{
    request.then((data)=>{
      dispatch({type: EDIT_POST, payload: data})
      callback()
    })
  }
}

export function fetchPost(postId) {
  const request = ReadableAPI.fetchPost(postId)
  return {
    type: FETCH_POST,
    payload: request
  }
}

export function deletePost(postId, callback) {
  ReadableAPI.deletePost(postId).then(callback)
  return {
    type: DELETE_POST,
    postId
  }
}

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
