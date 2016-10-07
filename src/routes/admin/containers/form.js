import { bindActionCreators } from 'redux'
import { reduxForm } from 'redux-form'
import { submit } from '../../../modules/admin/actions';
import Form from '../../../shared/components/common/form';

function mapStateToProps(state, props) {
  if (props.type === 'core') {
    return {
      fields: ['name', 'description'],
      selects: {},
      labels: ['Название DAO', 'Описание DAO'],
      placeholders: ['My DAO', 'description']
    }
  } else if (props.type === 'market') {
    return {
      fields: [],
      selects: {},
      labels: [],
      placeholders: []
    }
  } else if (props.type === 'token') {
    return {
      fields: ['name', 'symbol', 'decimals', 'start_count'],
      selects: {},
      labels: ['Название', 'Символ', 'Кол-во знаков', 'Начальная сумма'],
      placeholders: ['Название', 'S', 0, 0]
    }
  } else if (props.type === 'token-provider') {
    return {
      fields: ['name', 'symbol', 'decimals', 'start_count', 'acl', 'acl_group'],
      selects: {},
      labels: ['Название', 'Символ', 'Кол-во знаков', 'Начальная сумма', 'Адрес ACL', 'Название группы ACL'],
      placeholders: ['Название', 'S', 0, 0, '0x111111111', 'name'],
      autocomplete: {
        acl: true
      }
    }
  } else if (props.type === 'token-ambix') {
    return {
      fields: ['name', 'symbol', 'decimals', 'start_count'],
      selects: {},
      labels: ['Название', 'Символ', 'Кол-во знаков', 'Начальная сумма'],
      placeholders: ['Название', 'S', 0, 0]
    }
  } else if (props.type === 'ambix') {
    return {
      fields: [],
      selects: {},
      labels: [],
      placeholders: []
    }
  } else if (props.type === 'acl') {
    return {
      fields: [],
      selects: {},
      labels: [],
      placeholders: []
    }
  } else if (props.type === 'module') {
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
      labels: ['Тип модуля', 'Название', 'Адрес контракта'],
      placeholders: [],
      autocomplete: {
        address: true
      }
    }
  }
  return {}
}
function mapDispatchToProps(dispatch, props) {
  return {
    onSubmit: bindActionCreators(form => submit(form, props.type), dispatch)
  }
}
export default reduxForm({
  form: 'FormCreator'
}, mapStateToProps, mapDispatchToProps)(Form)
