import { connect } from 'react-redux'
import { Main } from '../components/main';

function mapStateToProps(state, props) {
  return {
    dao_address: state.app.dao_address,
    role: props.params.role
  }
}

export default connect(mapStateToProps)(Main)
