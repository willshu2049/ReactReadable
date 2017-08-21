import React from 'react'
import { connect } from 'react-redux'

import { getAllCategories, selectCategory } from '../actions/actions'

class ListCategories extends React.Component {

  // After page load, send an action to request for all categories
  componentDidMount() {
    this.props.getAllCategories()
  }

  render () {
    const { categories } = this.props.categories
    const { selectCategory } = this.props
    return (
        <ul className='list-categories list-group col-sm-4'>
          {
            /* You have to use categories && because fetching Categories from remote server is async, the very first time component renders, `categories` is null/undefined(should've set it to empty array). After data gets back from server, everything will render.*/
          }
          <li key='th-category' className='th-category list-group-item'>Category</li>
          {/*
             1. selectCategory is not a function of this class.
             so you can't write onClick={selectCategory(category)}.
             It's passed to render() as props.
             2. only input elements has event.target.value. Others elements has innerHTML
          */}
          {categories && categories.map( category => (
            <li
              key={category.name}
              onClick={(event)=>selectCategory(event.target.innerHTML)}
              className='list-group-item'>
              {category.name}
            </li>
          ))}
        </ul>
    )
  }
}

function mapStateToProps({categories}){
  return {
    categories,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getAllCategories: () => dispatch(getAllCategories()),
    selectCategory: (category) => dispatch(selectCategory(category))
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(ListCategories);
