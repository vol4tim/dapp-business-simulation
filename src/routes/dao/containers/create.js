import React from 'react'
import { connect } from 'react-redux'
import { Create } from '../../../shared/dao'

const Container = (props) => {
  const { module } = props
  return (<Create module={module} />)
}

function mapStateToProps(store, props) {
  return {
    module: props.params.module
  }
}

export default connect(mapStateToProps)(Container)
