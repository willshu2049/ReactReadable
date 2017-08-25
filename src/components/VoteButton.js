import React from 'react'

export default function VoteButton(props) {
  return (
    <button
      value={props.id}
      onClick={props.onClickButton}
      className={`btn btn-secondary ${props.option}`}>
      {props.option}
    </button>
  )
}
