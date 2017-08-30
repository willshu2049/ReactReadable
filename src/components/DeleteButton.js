import React from 'react'

function DeleteButton(props) {
  return (
    <button
      value={props.id}
      onClick={props.onClickButton}
      >
      Delete
    </button>
  )
}

export default DeleteButton;
