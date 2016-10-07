import React from 'react'
import Form from '../../containers/form'

const Main = (props) => {
  const { title, type } = props
  return (<div>
    <h4>{title}</h4>
    <Form type={type} />
  </div>)
}

export default Main
