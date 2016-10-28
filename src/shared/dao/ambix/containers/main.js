import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import { Main } from '../components'
import { loadModule, send } from '../../../../modules/ambix/actions';
import { send as sendToken } from '../../../../modules/token/actions';
import { send as sendTokenAcl } from '../../../../modules/tokenAcl/actions';

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
  const module = _.find(store.ambix.modules, ['address', props.address])
  return {
    ...module,
    address: props.address,
    isModule: !_.isEmpty(module)
  }
}
function mapDispatchToProps(dispatch, props) {
  const actions = bindActionCreators({
    loadModule,
    send
  }, dispatch)
  return {
    loadModule: actions.loadModule,
    onEmission: () => actions.send(props.address, 'run', []),
    onDelegate: tokenAddress => sendToken(tokenAddress, 'delegate', [props.address]),
    onApprove: (tokenAddress, count) => sendTokenAcl(tokenAddress, 'approve', [props.address, count])
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
