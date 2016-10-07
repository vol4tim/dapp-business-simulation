import React from 'react'

const Group = (props) => {
  const { name, members } = props

  return (<div className="panel panel-default">
    <div className="panel-heading">{name}</div>
    <div className="panel-body">
      <div className="list-group" style={{ marginBottom: 0 }}>
        {members.map((item, index) =>
          <p key={index} className="list-group-item">
            {item}
          </p>
        )}
      </div>
    </div>
  </div>)
}

export default Group
