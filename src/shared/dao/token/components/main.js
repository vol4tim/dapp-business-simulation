import React from 'react'
import { Link } from 'react-router'

const Main = (props) => {
  const { address, name, totalSupply, balance } = props
  return (<div>
    <h4>Token "{name}" <span className="label label-success">{address}</span></h4>
    <div className="btn-group" style={{ marginBottom: 10 }}>
      <Link to={'/dao/token/transfer/' + address} className="btn btn-default">Отправить</Link>
      <Link to={'/dao/token/approve/' + address} className="btn btn-default">Апрув</Link>
      <Link to={'/dao/token/emission/' + address} className="btn btn-default">Эмиссия</Link>
    </div>
    <p><b>Всего токенов</b>: {totalSupply}</p>
    <p><b>Мой баланс</b>: {balance}</p>
  </div>)
}

export default Main
