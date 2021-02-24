import React from 'react';

export default function Form({values, onChange, newSubmitionForm, disabled, errors}){

  const onSubmit = (event) => {
    event.preventDefault()
    newSubmitionForm()
  }
  const onChangee = (event) => {
  const {name, value, type, checked} = event.target
  const values = type ==='checkbox' ? checked: value
  onChange(name, value)
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label> Name
          <input
          name='name' type='text' placeholder= 'Name' />
          </label>
        </div>

      </form>
    </div>
  )
}