import { combineReducers } from 'redux'
import { ALL_CATEGORIES, SELECT_CATEGORY, VOTE, ALL_COMMENTS_OF_POST, SORT_METHOD, ADD_POST, INPUT_CHANGE, CLEAR_POST_FORM, CATEGORY_CHANGE } from '../actions/actions'

function categories(state={categories:[]}, action) {
  switch (action.type) {
    case ALL_CATEGORIES:
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
      /* The sort() method sorts the elements of an array in place and returns the array.
          Therefore you need to use [...state] to avoid shallow comparison problem.
          However you need to use another state 'sortMethod' to keep track of sortMethod on the Main page.
          So to avoid redundance you may sort your list of posts locally when rendering. Below code is when you sort it in reducer
          ```
          case ORDER_BY:
            const orderOption=action.value;
          const newState1 = [...state].sort(function(a,b){
            const keyA = a[orderOption];
            const keyB = b[orderOption];
            return (keyA < keyB) ? -1 : (keyA === keyB) ? 0 : 1
          }).reverse();
          console.log(newState1)
          return newState1
          ```
      */
    case ADD_POST:
      return state
    default:
      return state
  }
}

function comments(state=[], action) {
  switch (action.type) {
    case ALL_COMMENTS_OF_POST:
      return
    default:
      return state
  }
}

function sortMethod(state='voteScore', action) {
  switch (action.type) {
    case SORT_METHOD:
      return action.value
    default:
      return state
  }
}

// The initial state or CLEAR_POST_FORM state can't be null, but can be empty string.
function inputState(state={title:'', author:'', category:'', body:''}, action) {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        // [...] is called computed property
        [action.name]: action.value
      }
    case CATEGORY_CHANGE:
      return {
        ...state,
        [action.name]: action.value
      }
    case CLEAR_POST_FORM:
      return {
        title:'', author:'', body:''
      }
    default:
      return state
  }
}

export default combineReducers({
  categories,
  posts,
  sortMethod,
  inputState
})
