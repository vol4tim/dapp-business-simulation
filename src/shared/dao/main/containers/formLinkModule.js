import { bindActionCreators } from 'redux'
import { reduxForm } from 'redux-form'
import { submitLinkModule } from '../../../../modules/dao/actions';
import Form from '../../../../shared/components/common/form';

function mapStateToProps(state, props) {
  return {
    fields: ['type', 'name', 'address'],
    selects: {
      type: [
        {
          name: 'Токен',
          value: 'token'
        },
        {
          name: 'Токен ACL',
          value: 'token-acl'
        },
        {
          name: 'Рынок',
          value: 'market'
        },
        {
          name: 'ACL',
          value: 'acl'
        },
        {
          name: 'Ценная бумага',
          value: 'ambix'
        }
      ]
    },
    initialValues: { type: props.module, address: props.address },
    labels: ['Тип модуля', 'Название', 'Адрес контракта'],
    placeholders: []
  }
}
function mapDispatchToProps(dispatch, props) {
  return {
    onSubmit: bindActionCreators(form => submitLinkModule(props.daoAddress, form), dispatch)
  }
}
export default reduxForm({
  form: 'FormLinkModule'
}, mapStateToProps, mapDispatchToProps)(Form)
