import React from 'react'
import Auto from '../../../components/common/auto'

const Form = (props) => {
  const {
    fields: { token },
    handleSubmit,
    error,
    submitting
  } = props

  return (
    <form onSubmit={handleSubmit}>
      <button type="button" onClick={() => { token.addField() }} className="btn btn-success">Add token</button>
      {!token.length && <div>No token</div>}
      {token.map((child, index) => <div key={index} className="row" style={{ marginBottom: 10 }}>
        <div className="form-group">
          <span className="col-xs-2 control-label">
            Token #{index + 1}
          </span>
          <div className="col-xs-5">
            <Auto field={child.address} placeholder="Token address" />
          </div>
          <div className="col-xs-3">
            <input
              type="text"
              className="form-control"
              placeholder="Amount"
              {...child.count}
            />
          </div>
          <div className="col-xs-2 btn-toolbar">
            <button type="button" onClick={() => { token.removeField(index) }} className="btn btn-danger">Remove</button>
          </div>
        </div>
      </div>)}

      <div className="form-group">
        <div className="text-center">
          <input
            type="submit"
            className="btn btn-default"
            disabled={submitting}
            value={submitting ? '...' : 'Подтвердить'}
          />
        </div>
      </div>
      {error && <div>{error}</div>}
    </form>
  )
}

export default Form
