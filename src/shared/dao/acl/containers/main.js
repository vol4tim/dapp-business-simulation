import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import { Main } from '../components'
import { loadModule } from '../../../../modules/acl/actions';

class Container extends Component {
  componentWillMount() {
    this.props.loadModule(this.props.address)
  }
  render() {
    if (this.props.isModule) {
      return <Main {...this.props} />
    }
    return <p>...</p>
  }
}

function mapStateToProps(store, props) {
  const module = _.find(store.acl.modules, ['address', props.address])
  return {
    ...module,
    address: props.address,
    isModule: !_.isEmpty(module)
  }
}
function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators({
    loadModule
  }, dispatch)
  return {
    loadModule: actions.loadModule
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
