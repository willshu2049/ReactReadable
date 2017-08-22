import * as ReadableAPI from '../utils/ReadableAPI'

export const ALL_CATEGORIES = 'ALL_CATEGORIES'

export const SELECT_CATEGORY = 'SELECT_CATEGORY'

export const VOTE = 'VOTE'

export const ALL_COMMENTS_OF_POST = 'ALL_COMMENTS_OF_POST'

export const SORT_METHOD = 'SORT_METHOD'

export function allCategories() {
  const allCategories = ReadableAPI.allCategories()
  return {
    type: ALL_CATEGORIES,
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

// export function allCommentsOfPost() {
//   const allCommentsOfPost = ReadableAPI.allCommentsOfPost()
//   return {
//     type: ALL_COMMENTS_OF_POST,
//     payload: allCommentsOfPost
//   }
// }

export function updateSortMethod(value) {
  return {
    type: SORT_METHOD,
    value
  }
}
