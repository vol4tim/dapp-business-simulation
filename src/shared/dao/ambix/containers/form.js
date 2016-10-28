import { bindActionCreators } from 'redux'
import { reduxForm } from 'redux-form'
import { submit } from '../../../../modules/ambix/actions'
import Form from '../components/form'

function mapStateToProps() {
  return {
    fields: [
      'token[].count',
      'token[].address'
    ]
  }
}
function mapDispatchToProps(dispatch, props) {
  return {
    onSubmit: bindActionCreators(form => submit(props.address, props.action, form), dispatch)
  }
}
export default reduxForm({
  form: 'FormAmbix'
}, mapStateToProps, mapDispatchToProps)(Form)
