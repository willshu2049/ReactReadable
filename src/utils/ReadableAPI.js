const api = 'http://localhost:5001'

//Generate a unique token for storing data on the backend server.

let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

export const allCategories = () =>
  fetch(`${api}/categories`, { headers: { 'Authorization': token }})
    .then(res => res.json())
    .then(data => data)

// POSTS METHODS
export const postsOfCategory = (category) =>
  fetch(`${api}/${category}/posts`, { headers: { 'Authorization': token }})
    .then(res => res.json())
    .then(data => data)

export const allPosts = () =>
  fetch(`${api}/posts`, { headers: { 'Authorization': token }})
    .then(res => res.json())
    .then(data => data)

export const addPost = (id, timestamp, title, body, author, category) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: `${id}`, timestamp:  `${timestamp}`, title:  `${title}`, body:  `${body}`, author:  `${author}`, category:  `${category}`})
  }).then(res => res.json())
    .then(data => data)

export const fetchPost = (postId) =>
  fetch(`${api}/posts/${postId}`, { headers: { 'Authorization': token }})
    .then(res => res.json())
    .then(data => data)

export const votePost = (postId, option) =>
  fetch(`${api}/posts/${postId}`, {
    method: 'POST',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option: `${option}` })
  }).then(res => res.json())
    .then(data => data)

export const editPost = (id, title, body) =>
  fetch(`${api}/posts/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title: `${title}`, body: `${body}` })
  }).then(res => res.json())
    .then(data => data)

export const deletePost = (postId) =>
  fetch(`${api}/posts/${postId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    }
    // Here you must use res instead of res.json()
    /* Explanation from Slack @javi: I went to look at the code of the server, the reactnd-readable-server project they provided,
     * and I saw there that the function that disables a post, setting the "deleted" field as "true", it returns a single value.
     * It doesn't return an object like other functions are doing. That means, what comes as a response of the promise we're using here on the ReadableAPI is not a JSON object,
     * it's just the postId that we deleted. We were trying to do `res.json()` and that gave us the error `Unexpected end of JSON input` —
     * I guess that's simply because the variable `res` is not a JSON object. So, doing `res => res` works as expected, and what you get is the PostId
     */
   }).then(res => res.json)
    .then(data => data)

// COMMENTS METHODS
export const allCommentsOfPost = (postId) =>
  fetch(`${api}/posts/${postId}/comments`, { headers: { 'Authorization': token }})
    .then(res => res.json())
    .then(data => data)

export const addComment = (postId, comment) =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: `${Math.random().toString(36).substr(-8)}`, timestamp: `${Date.now()}`, body: `${comment.body}`, author: `${comment.author}`, parentId: `${postId}` })
  }).then(res => res.json())
    .then(data => data)

export const commentDetail = (commentId) =>
  fetch(`${api}/comments/${commentId}`, { headers: { 'Authorization': token }})
    .then(res => res.json())
    .then(data => data)

export const voteComment = (commentId, option) =>
  fetch(`${api}/comments/${commentId}`, {
    method: 'POST',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option: `${option}` })
  }).then(res => res.json())
    .then(data => data)

export const editComment = (comment) =>
  fetch(`${api}/comments/${comment.id}`, {
    method: 'PUT',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ timestamp: `${comment.timestamp}`, body: `${comment.body}` })
  }).then(res => res.json())
    .then(data => data)

export const deleteComment = (commentId) =>
  fetch(`${api}/comments/${commentId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    }
  }).then(res => res)
    .then(data => data)
