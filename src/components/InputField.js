import React from 'react'

export default function InputField(props) {
  return (
    <div>
      <p>{props.heading}</p>
      <input
        name={props.name}
        value={props.value}
        onChange={ props.onInputChange }
        placeholder={props.placeholder}
        className={`form-control col-md-6 ${props.option}`} />
    </div>
  )
}
