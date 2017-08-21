import * as ReadableAPI from '../utils/ReadableAPI'

export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES'

export const SELECT_CATEGORY = 'SELECT_CATEGORY'

export const VOTE = 'VOTE'

export function getAllCategories() {
  const allCategories = ReadableAPI.allCategories()
  return {
    type: GET_ALL_CATEGORIES,
    payload: allCategories
  }
}

export function selectCategory(category) {
  const postsOfCategory = (category==='All')? ReadableAPI.allPosts(): ReadableAPI.postsOfCategory(category)
  return {
    type: SELECT_CATEGORY,
    // redux-promise checks if an action has a payload and then if the payload is a promise. so you can only use 'payload' as key here
    payload: postsOfCategory
  }
}

export function voteScore(id, option) {
  // update the state in the server
  ReadableAPI.votePost(id, option)
  // send an action to update local state
  return {
    type: VOTE,
    id,
    option
  }
}
