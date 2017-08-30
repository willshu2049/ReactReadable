import React from 'react'
import { connect } from 'react-redux'
import { List } from 'semantic-ui-react'

import { allCategories, selectCategory } from '../actions/actions'

class CategoriesList extends React.Component {

  // After page load, send an action to request for all categories
  componentDidMount() {
    this.props.allCategories()
  }

  render () {
    const { categories } = this.props.categories
    const { selectCategory } = this.props
    return (
        <List>
          <List.Item key='th-category'>Category</List.Item>
          {/*
            If you get error:"can't read property map of undefined", then use 'categories &&' to check if categories exists.
            There may be different reasons. First reason may be because fetching Categories from remote server is async,
            the very first time component renders, `categories` is null/undefined(should've set it to empty array).
            After data gets back from server, everything will render.
            The second reason may be that you may set the wrong initial state in the reducers.
          */}
          {/*
            1. selectCategory is not a function of this class.
            so you can't write onClick={selectCategory(category)}.
            It's passed to render() as props.
            2. only input elements has event.target.value. Others elements has innerHTML
          */}
          {categories.map( category => (
            <List.Item
              key={category.name}
              onClick={selectCategory}>
              {category.name}
            </List.Item>
          ))}
        </List>
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
    allCategories: () => dispatch(allCategories()),
    selectCategory: (e) => dispatch(selectCategory(e.target.innerHTML))
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(CategoriesList);
