import React from 'react'
import { connect } from 'react-redux'
import * as Modules from '../../../shared/dao'

const Container = (props) => {
  const { address, module } = props
  const Module = Modules[module]
  return (<Module address={address} />)
}

function mapStateToProps(store, props) {
  let module = props.params.module
  if (module === 'token-provider') {
    module = 'tokenAcl'
  }
  return {
    module,
    address: props.params.address
  }
}

export default connect(mapStateToProps)(Container)
