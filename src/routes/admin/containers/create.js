import { connect } from 'react-redux'
import { Main } from '../components/create';

function mapStateToProps(store, props) {
  let title
  switch (props.params.type) {
    case 'core':
      title = 'Создать ядро'
      break
    case 'token':
      title = 'Создать токен'
      break
    case 'token-provider':
      title = 'Создать токен поставщика'
      break
    case 'market':
      title = 'Создать рынок'
      break
    case 'ambix':
      title = 'Создать ценную бумагу'
      break
    case 'acl':
      title = 'Создать ACL'
      break
    case 'module':
      title = 'Добавить модуль в ядро'
      break
    default:
      title = '';
  }
  return {
    title,
    type: props.params.type
  }
}

export default connect(mapStateToProps)(Main)
