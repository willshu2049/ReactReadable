import React from 'react'

class ListCategories extends React.Component {
  render () {
    const categories = this.props.categories.categories
    return (
      <div>
        <ul className='list-group'>
          {
            /* You have to use categories && because fetching Categories from remote server is async, the very first time component renders, `categories` is null/undefined(should've set it to empty array). After data gets back from server, everything will render.*/
          }
          {categories && categories.map( (category) => (
            <li key={category.name} className='list-group-item'>
              {category.name}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default ListCategories;
