import { combineReducers } from 'redux'
import { GET_ALL_CATEGORIES, SELECT_CATEGORY, VOTE } from '../actions/actions'

function categories(state=[], action) {
  switch (action.type) {
    case GET_ALL_CATEGORIES:
      return action.payload
    default:
      return state
  }
}

function posts(state=[], action) {
  switch (action.type) {
    case SELECT_CATEGORY:
      return action.payload
    case VOTE:
      const newState=[...state]
      return newState.map( ele => {
        if(ele.id === action.id){
          (action.option === 'upVote') ? ele.voteScore++ : ele.voteScore--
        }
        return ele
      })
    default:
      return state
  }
}

export default combineReducers({
  categories,
  posts,
})
