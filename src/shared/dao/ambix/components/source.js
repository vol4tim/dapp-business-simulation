import React from 'react'

const Source = (props) => {
  const { items, approve } = props

  return (<div className="panel panel-default">
    <div className="panel-heading">Source</div>
    <div className="panel-body">
      <div className="list-group" style={{ marginBottom: 0 }}>
        {items.map((item, index) =>
          <div key={index} className="list-group-item">
            {!item.isApprove &&
              <button onClick={() => approve(item.address, item.count)} className="btn btn-default pull-right">Approve</button>
            }
            <span className="label label-success">{item.address}</span><br />
            "<b>{item.name}</b>" требуется {item.countStr}<br />
            Баланс: {item.balanceStr}<br />
            Approve: {item.allowanceStr}
          </div>
        )}
      </div>
    </div>
  </div>)
}

export default Source
