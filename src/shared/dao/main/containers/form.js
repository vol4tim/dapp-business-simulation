import { bindActionCreators } from 'redux'
import { reduxForm } from 'redux-form'
import { submit } from '../../../../modules/admin/actions';
import Form from '../../../../shared/components/common/form';

function mapStateToProps(state, props) {
  if (props.module === 'core') {
    return {
      fields: ['name', 'description'],
      selects: {},
      labels: ['Название DAO', 'Описание DAO'],
      placeholders: ['My DAO', 'description']
    }
  } else if (props.module === 'market') {
    return {
      fields: [],
      selects: {},
      labels: [],
      placeholders: []
    }
  } else if (props.module === 'token') {
    return {
      fields: ['name', 'symbol', 'decimals', 'start_count'],
      selects: {},
      labels: ['Название', 'Символ', 'Кол-во знаков', 'Начальная сумма'],
      placeholders: ['Название', 'S', 0, 0]
    }
  } else if (props.module === 'token-provider') {
    return {
      fields: ['name', 'symbol', 'decimals', 'start_count', 'acl', 'acl_group'],
      selects: {},
      labels: ['Название', 'Символ', 'Кол-во знаков', 'Начальная сумма', 'Адрес ACL', 'Название группы ACL'],
      placeholders: ['Название', 'S', 0, 0, '0x111111111', 'name'],
      autocomplete: {
        acl: true
      }
    }
  } else if (props.module === 'token-ambix') {
    return {
      fields: ['name', 'symbol', 'decimals', 'start_count'],
      selects: {},
      labels: ['Название', 'Символ', 'Кол-во знаков', 'Начальная сумма'],
      placeholders: ['Название', 'S', 0, 0]
    }
  } else if (props.module === 'ambix') {
    return {
      fields: [],
      selects: {},
      labels: [],
      placeholders: []
    }
  } else if (props.module === 'acl') {
    return {
      fields: [],
      selects: {},
      labels: [],
      placeholders: []
    }
  }
  return {}
}
function mapDispatchToProps(dispatch, props) {
  return {
    onSubmit: bindActionCreators(form => submit(form, props.module), dispatch)
  }
}
export default reduxForm({
  form: 'FormCreator'
}, mapStateToProps, mapDispatchToProps)(Form)
