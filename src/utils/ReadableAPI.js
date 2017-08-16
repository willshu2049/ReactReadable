const api = 'http://localhost:5001'

//Generate a unique token for storing data on the backend server.

let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

export const allCategories = () =>
  fetch(`${api}/categories`, { headers: { 'Authorization': token }})
    .then(res => res.json())
    .then(data => data)

export const postsOfCategory = (category) =>
  fetch(`${api}/${category}/posts`, { headers: { 'Authorization': token }})
    .then(res => res.json())
    .then(data => data)

export const allPosts = () =>
  fetch(`${api}/posts`, { headers: { 'Authorization': token }})
    .then(res => res.json())
    .then(data => data)

// error
export const addPost = (post) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: `${Math.random().toString(36).substr(-8)}`, timestamp: `${null}`, title: `${post.title}`, body: `${post.body}`, owner: `${post.owner}`, category: `${post.category}`})
  }).then(res => res.json())
    .then(data => data.books)

export const postDetail = (id) =>
  fetch(`${api}/posts/${id}`, { headers: { 'Authorization': token }})
    .then(res => res.json())
    .then(data => data)

export const votePost = (id, option) =>
  fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option: `${option}` })
  }).then(res => res.json())
    .then(data => data.books)

// untested
export const editPost = (post) =>
  fetch(`${api}/posts/${post.id}`, {
    method: 'PUT',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title: `${post.title}`, body: `${post.body}` })
  }).then(res => res.json())
    .then(data => data.books)

// untested
export const deletePost = (post) =>
  fetch(`${api}/posts/${post.id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': token,
    }
  }).then(res => res.json())
    .then(data => data.books)

// untested
export const allComments = (post) =>
  fetch(`${api}/posts/${post.id}/comments`, { headers: { 'Authorization': token }})
    .then(res => res.json())
    .then(data => data)

// untested
export const addComment = (post, comment) =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: `${Math.random().toString(36).substr(-8)}`, timestamp: `${null}`, body: `${comment.body}`, owner: `${comment.author}`, parentID: `${post.id}` })
  }).then(res => res.json())
    .then(data => data.books)

// untested
export const commentDetail = (comment) =>
  fetch(`${api}/comments/${comment.id}`, { headers: { 'Authorization': token }})
    .then(res => res.json())
    .then(data => data)

// untested
export const voteComment = (comment, option) =>
  fetch(`${api}/comments/${comment.id}`, {
    method: 'POST',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option: `${option}` })
  }).then(res => res.json())
    .then(data => data.books)

// untested
export const editComment = (comment) =>
  fetch(`${api}/posts/${comment.id}`, {
    method: 'PUT',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ timestamp: `${null}`, body: `${comment.body}` })
  }).then(res => res.json())
    .then(data => data.books)

// untested
export const deleteComment = (comment) =>
  fetch(`${api}/posts/${comment.id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': token,
    }
  }).then(res => res.json())
    .then(data => data.books)
