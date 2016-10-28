import React from 'react'
import { Link } from 'react-router'
import _ from 'lodash'
import { Layout } from '../../main/components'
import Sink from './sink'
import Source from './source'

const Main = (props) => {
  const { address, sink, source, onEmission, onDelegate, onApprove } = props
  const menu = (<div className="btn-group" style={{ marginBottom: 10 }}>
    {_.isEmpty(sink) &&
      <Link to={'/dao/ambix/sink/' + address} className="btn btn-default">Выпуск</Link>
    }
    {_.isEmpty(source) &&
      <Link to={'/dao/ambix/source/' + address} className="btn btn-default">Состав</Link>
    }
    {(!_.isEmpty(sink) && !_.isEmpty(source)) &&
      <button onClick={onEmission} className="btn btn-default">Эмиссия</button>
    }
  </div>)
  return (<Layout title="Ambix" address={address} menu={menu}>
    {!_.isEmpty(sink) &&
      <Sink items={sink} delegate={onDelegate} />
    }
    {!_.isEmpty(source) &&
      <Source items={source} approve={onApprove} />
    }
  </Layout>)
}

export default Main
