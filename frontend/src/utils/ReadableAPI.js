const host = 'http://localhost:5001'

//Generate a unique token for storing data on the backend server.

let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

export const allCategories = () =>
  fetch(`${host}/categories`, { headers: { 'Authorization': token }})
    .then(res => res.json())
    .then(data => data)

// POSTS METHODS
export const postsOfCategory = (category) =>
  fetch(`${host}/${category}/posts`, { headers: { 'Authorization': token }})
    .then(res => res.json())
    .then(data => data)

export const allPosts = () =>
  fetch(`${host}/posts`, { headers: { 'Authorization': token }})
    .then(res => res.json())
    .then(data => data)

export const addPost = (id, timestamp, title, body, author, category) =>
  fetch(`${host}/posts`, {
    method: 'POST',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({id, timestamp, title, body, author, category})
  }).then(res => res.json())
    .then(data => data)

export const fetchPost = (postId) =>
  fetch(`${host}/posts/${postId}`, { headers: { 'Authorization': token }})
    .then(res => res.json())
    .then(data => data)

export const votePost = (postId, option) =>
  fetch(`${host}/posts/${postId}`, {
    method: 'POST',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option })
  }).then(res => res.json())
    .then(data => data)

export const editPost = (postId, title, body) =>
  fetch(`${host}/posts/${postId}`, {
    method: 'PUT',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, body })
  }).then(res => res.json())
    .then(data => data)

export const deletePost = (postId) =>
  fetch(`${host}/posts/${postId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    }
    // Here you must use res instead of res.json()
    /* Explanation from Slack @javi: I went to look at the code of the server, the reactnd-readable-server project they provided,
     * and I saw there that the function that disables a post, setting the "deleted" field as "true", it returns a single value.
     * It doesn't return an object like other functions are doing. That means, what comes as a response of the promise we're using here on the Readablehost is not a JSON object,
     * it's just the postId that we deleted. We were trying to do `res.json()` and that gave us the error `Unexpected end of JSON input` —
     * I guess that's simply because the variable `res` is not a JSON object. So, doing `res => res` works as expected, and what you get is the PostId
     */
   }).then(res => res.json)
    .then(data => data)

// COMMENTS METHODS
export const allCommentsOfPost = (postId) =>
  fetch(`${host}/posts/${postId}/comments`, { headers: { 'Authorization': token }})
    .then(res => res.json())
    .then(data => data)

export const addComment = (commentId, timestamp, body, author, postId) =>
  fetch(`${host}/comments`, {
    method: 'POST',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: commentId, timestamp, body, author, parentId: `${postId}` })
  }).then(res => res.json())
    .then(data => data)

export const fetchComment = (commentId) =>
  fetch(`${host}/comments/${commentId}`, { headers: { 'Authorization': token }})
    .then(res => res.json())
    .then(data => data)

export const voteComment = (commentId, option) =>
  fetch(`${host}/comments/${commentId}`, {
    method: 'POST',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option })
  }).then(res => res.json())
    .then(data => data)

export const editComment = (commentId, timestamp, body) =>
  fetch(`${host}/comments/${commentId}`, {
    method: 'PUT',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ timestamp, body })
  }).then(res => res.json())
    .then(data => data)

export const deleteComment = (commentId) =>
  fetch(`${host}/comments/${commentId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    }
  }).then(res => res)
    .then(data => data)
