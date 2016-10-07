import React from 'react'
import { Link } from 'react-router'

const Block = (props) => {
  const { name, type, modules } = props

  return (<div className="panel panel-default">
    <div className="panel-heading">{name}</div>
    <div className="panel-body">
      <div className="list-group" style={{ marginBottom: 0 }}>
        {modules.map((item, index) =>
          <Link key={index} to={'/dao/' + type + '/' + item.address} className="list-group-item">
            {item.name}<br />
            <small>{item.address}</small>
          </Link>
        )}
      </div>
    </div>
  </div>)
}

export default Block
