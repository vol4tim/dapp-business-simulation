import React from 'react'
import { Link } from 'react-router'
import _ from 'lodash'
import Sink from './sink'
import Source from './source'

const Main = (props) => {
  const { address, sink, source, run, delegate, approve } = props

  return (<div>
    <h4>Ambix <span className="label label-success">{address}</span></h4>
    <div className="btn-group" style={{ marginBottom: 10 }}>
      {_.isEmpty(sink) &&
        <Link to={'/dao/ambix/sink/' + address} className="btn btn-default">Выпуск</Link>
      }
      {_.isEmpty(source) &&
        <Link to={'/dao/ambix/source/' + address} className="btn btn-default">Состав</Link>
      }
      {(!_.isEmpty(sink) && !_.isEmpty(source)) &&
        <button onClick={run} className="btn btn-default">Эмиссия</button>
      }
    </div>
    {!_.isEmpty(sink) &&
      <Sink items={sink} delegate={delegate} />
    }
    {!_.isEmpty(source) &&
      <Source items={source} approve={approve} />
    }
  </div>)
}

export default Main
