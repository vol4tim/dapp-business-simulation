import React from 'react'

const Sink = (props) => {
  const { items, delegate } = props

  return (<div className="panel panel-default">
    <div className="panel-heading">Sink</div>
    <div className="panel-body">
      <div className="list-group" style={{ marginBottom: 0 }}>
        {items.map((item, index) =>
          <div key={index} className="list-group-item">
            {!item.isOwner &&
              <button onClick={() => delegate(item.address)} className="btn btn-default pull-right">Передать управление</button>
            }
            <span className="label label-success">{item.address}</span><br />
            "<b>{item.name}</b>" для выпуска {item.countStr}<br />
            Owner: {item.owner}<br />
            Баланс: {item.balanceStr}
          </div>
        )}
      </div>
    </div>
  </div>)
}

export default Sink
