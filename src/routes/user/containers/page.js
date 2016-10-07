import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import Layout from '../../../shared/components/common/layout'

class Container extends Component {
  componentWillMount() {
    this.checkDao(this.props.dao_address)
  }
  componentWillReceiveProps(nextProps) {
    this.checkDao(nextProps.dao_address)
  }
  checkDao(address) {
    if (!address) {
      this.context.router.push('/')
    }
  }
  render() {
    const { title, menu, children } = this.props

    return (<Layout
      title={title}
      menu={menu}
    >
      {children}
    </Layout>)
  }
}

Container.contextTypes = {
  router: PropTypes.object.isRequired
}

function mapStateToProps(state, props) {
  let title = ''
  if (props.params.role === 'audit') {
    title = 'Аудитор'
  } else if (props.params.role === 'provider') {
    title = 'Поставщик'
  } else if (props.params.role === 'seller') {
    title = 'Продавец'
  } else if (props.params.role === 'buyer') {
    title = 'Покупатель'
  }
  return {
    dao_address: state.app.dao_address,
    role: props.params.role,
    title,
    menu: []
  }
}

export default connect(mapStateToProps)(Container)
