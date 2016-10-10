import React from 'react'
import FormLink from '../containers/formLink'

const LinkModule = (props) => {
  const { title, module, address } = props
  return (<div>
    <h4>{title}</h4>
    <FormLink module={module} address={address} />
  </div>)
}

export default LinkModule
