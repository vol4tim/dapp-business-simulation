import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import { Main } from '../components'
import { loadModule, submit } from '../../../../modules/ambix/actions';
import { run as runToken } from '../../../../modules/token/actions';
import { run as runTokenAcl } from '../../../../modules/tokenAcl/actions';

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
    submit
  }, dispatch)
  return {
    loadModule: actions.loadModule,
    run: () => actions.submit(props.address, 'run', []),
    delegate: tokenAddress => runToken(dispatch, tokenAddress, 'delegate', [props.address]),
    approve: (tokenAddress, count) => runTokenAcl(dispatch, tokenAddress, 'approve', [props.address, count])
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
