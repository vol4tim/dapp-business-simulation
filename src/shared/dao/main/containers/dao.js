import { connect } from 'react-redux'
import _ from 'lodash'
import { Dao } from '../components';

function mapStateToProps(state, props) {
  const { dao } = state
  const { role } = props
  let modules = []
  if (role === 'audit') {
    modules = ['token', 'token-provider']
  } else if (role === 'provider') {
    modules = ['market', 'token', 'token-provider']
  } else if (role === 'seller') {
    modules = ['market', 'token', 'token-provider', 'ambix']
  } else if (role === 'buyer') {
    modules = ['market', 'token']
  }
  let blocks = dao.blocks
  if (!_.isEmpty(modules)) {
    blocks = _.filter(blocks, block => _.some(modules, i => i === block.type));
  }
  return {
    name: dao.name,
    address: dao.address,
    role,
    blocks
  }
}

export default connect(mapStateToProps)(Dao)
