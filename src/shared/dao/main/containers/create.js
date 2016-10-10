import { connect } from 'react-redux'
import Create from '../components/create';

function mapStateToProps(store, props) {
  let title
  switch (props.module) {
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
    default:
      title = '';
  }
  return {
    title,
    module: props.module
  }
}

export default connect(mapStateToProps)(Create)
