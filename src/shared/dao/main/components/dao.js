import React from 'react'
import Block from './block'

const Dao = (props) => {
  const { name, address, blocks } = props

  return (<div>
    <p><b>{name}</b> <span className="label label-success">{address}</span></p>
    {blocks.map((block, index) => <Block key={index} {...block} />)}
  </div>)
}

export default Dao
