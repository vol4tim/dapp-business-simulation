import React from 'react'
import { Link } from 'react-router'

const Main = (props) => {
  const { address, name, totalSupply, balance, aclGroup, role } = props
  return (<div>
    <h4>Token "{name}" <span className="label label-success">{address}</span></h4>
    <div className="btn-group" style={{ marginBottom: 10 }}>
      <Link to={'/dao/token-provider/transfer/' + address} className="btn btn-default">Отправить</Link>
      <Link to={'/dao/token-provider/approve/' + address} className="btn btn-default">Апрув</Link>
      {(role === 'admin' || role === 'audit') &&
        <Link to={'/dao/token-provider/emission/' + address} className="btn btn-default">Эмиссия</Link>
      }
    </div>
    <p><b>Всего токенов</b>: {totalSupply}</p>
    <p><b>Мой баланс</b>: {balance}</p>
    <p><b>ACL group</b>: {aclGroup}</p>
  </div>)
}

export default Main
