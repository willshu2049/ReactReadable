import * as ReadableAPI from '../utils/ReadableAPI'

export const ALL_CATEGORIES = 'ALL_CATEGORIES'
export const SELECT_CATEGORY = 'SELECT_CATEGORY'
export const VOTE = 'VOTE'
export const SORT_METHOD = 'SORT_METHOD'
export const ADD_POST = 'ADD_POST'
export const ALL_POSTS = 'ALL_POSTS'
export const FETCH_POST = 'FETCH_POST'
export const DELETE_POST = 'DELETE_POST'
export const EDIT_POST = 'EDIT_POST'
export const ALL_COMMENTS_OF_POST = 'ALL_COMMENTS_OF_POST'

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

export function votePost(id, option) {
  // update the state in the server
  ReadableAPI.votePost(id, option)
  // send an action to update local state
  return {
    type: VOTE,
    id,
    option
  }
}

export function updateSortMethod(value) {
  return {
    type: SORT_METHOD,
    value
  }
}

export function addPost(values, callback) {
  const id = Math.random().toString(36).substr(-8)
  // Date.now() produces the UTC time. Use UTC time solves "time zone" problem.
  const timestamp = Date.now()
  // update the state in the server. It seems after you go back the main page automatically updates to the new state. Is this the correct way of doing things?
  const request = ReadableAPI.addPost(id, timestamp, values.title, values.body, values.author, values.category).then(callback);

  return {
    type: ADD_POST,
    payload: request
  }
}

export function editPost(id, values, callback) {
  const request = ReadableAPI.editPost(id, values.title, values.body).then(callback);
  return {
    type: EDIT_POST,
    payload: request
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
  }
}

export function allCommentsOfPost(postId) {
  const allCommentsOfPost = ReadableAPI.allCommentsOfPost(postId)
  return {
    type: ALL_COMMENTS_OF_POST,
    payload: allCommentsOfPost
  }
}
