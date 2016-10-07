import React from 'react'
import { connect } from 'react-redux'
import Layout from '../../../shared/components/common/layout'

const Container = (props) => {
  const { title, menu, children } = props

  return (<Layout
    title={title}
    menu={menu}
  >
    {children}
  </Layout>)
}

function mapStateToProps() {
  return {
    title: 'Администратор',
    menu: [
      { href: '/admin', name: 'DAO' },
      { href: '/admin/create/core', name: 'Создать ядро' },
      { href: '/admin/create/market', name: 'Создать рынок' },
      { href: '/admin/create/token', name: 'Создать токен' },
      { href: '/admin/create/acl', name: 'Создать ACL' },
      { href: '/admin/create/token-provider', name: 'Создать токен поставщика' },
      { href: '/admin/create/ambix', name: 'Создать ценную бумагу' },
      { href: '/admin/create/module', name: 'Добавить модуль в ядро' }
    ]
  }
}

export default connect(mapStateToProps)(Container)
