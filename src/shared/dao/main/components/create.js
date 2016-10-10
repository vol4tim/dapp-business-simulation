import React from 'react'
import Form from '../containers/form'

const Create = (props) => {
  const { title, module } = props
  return (<div>
    <h4>{title}</h4>
    <Form module={module} />
  </div>)
}

export default Create
