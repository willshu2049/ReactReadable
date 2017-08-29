import React from 'react'

function DeleteButton(props) {
  return (
    <button
      className='btn btn-danger float-sm-right'
      onClick={props.onClickButton}
      >
      Delete
    </button>
  )
}

export default DeleteButton;
