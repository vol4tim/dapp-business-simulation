import React from 'react'
import { connect } from 'react-redux'
import { LinkModule } from '../../../shared/dao'

const Container = (props) => {
  const { module, address } = props
  return (<LinkModule module={module} address={address} />)
}

function mapStateToProps(store, props) {
  return {
    module: props.params.module,
    address: props.params.address
  }
}

export default connect(mapStateToProps)(Container)
