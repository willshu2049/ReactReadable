import React from 'react'
import { Link } from 'react-router-dom'

class CreateEditView extends React.Component {
  render () {
    return (
      <Link to='/' className='back-to-default'>Go Back</Link>
    )
  }
}

export default CreateEditView;
