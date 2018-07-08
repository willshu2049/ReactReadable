import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Header, Menu, Icon } from 'semantic-ui-react'

import { selectCategory } from '../../actions'

class CategoriesList extends React.Component {

  render () {
    const { categories } = this.props.categories
    const { activeCategory, selectCategory } = this.props
    return (
      <Menu secondary compact vertical>
        <Header as={'h4'}><Icon name='unordered list' />Category</Header>
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
        {categories && categories.map( category => (
          <Menu.Item
            as={Link}
            to={`/${category.name}`}
            key={category.name}
            onClick={(e)=>selectCategory(e.target.innerHTML)}
            active={category.name === activeCategory}>
            {category.name}
          </Menu.Item>
        ))}
      </Menu>
    )
  }
}

export default connect(
  ({categories, activeCategory})=>({categories, activeCategory}),
  { selectCategory }
)(CategoriesList);
