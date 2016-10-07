import React from 'react'
import { connect } from 'react-redux'
import * as Modules from '../../../shared/dao'

const Container = (props) => {
  const { address, module, action } = props
  const Module = Modules[module + 'Action']
  return (<Module address={address} action={action} />)
}

function mapStateToProps(store, props) {
  let module = props.params.module
  if (module === 'token-provider') {
    module = 'tokenAcl'
  }
  return {
    module,
    address: props.params.address,
    action: props.params.action
  }
}

export default connect(mapStateToProps)(Container)
