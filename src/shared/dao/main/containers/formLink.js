import { bindActionCreators } from 'redux'
import { reduxForm } from 'redux-form'
import { submit } from '../../../../modules/admin/actions';
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
          name: 'Токен поставщика',
          value: 'token-provider'
        },
        {
          name: 'Ценная бумага',
          value: 'ambix'
        },
        {
          name: 'Рынок',
          value: 'market'
        },
        {
          name: 'ACL',
          value: 'acl'
        }
      ]
    },
    initialValues: { type: props.module, address: props.address },
    labels: ['Тип модуля', 'Название', 'Адрес контракта'],
    placeholders: [],
    autocomplete: {
      address: true
    }
  }
}
function mapDispatchToProps(dispatch) {
  return {
    onSubmit: bindActionCreators(form => submit(form, 'module'), dispatch)
  }
}
export default reduxForm({
  form: 'FormCreator'
}, mapStateToProps, mapDispatchToProps)(Form)
