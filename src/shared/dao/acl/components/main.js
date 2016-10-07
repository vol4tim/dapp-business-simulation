import React from 'react'
import { Link } from 'react-router'
import Group from './group'

const Main = (props) => {
  const { address, groups } = props
  return (<div>
    <h4>ACL <span className="label label-success">{address}</span></h4>
    <div className="btn-group" style={{ marginBottom: 10 }}>
      <Link to={'/dao/acl/group/' + address} className="btn btn-default">Создать группу</Link>
      <Link to={'/dao/acl/member/' + address} className="btn btn-default">Добавить адрес</Link>
    </div>
    {groups.map((group, index) => <Group key={index} {...group} />)}
  </div>)
}

export default Main
