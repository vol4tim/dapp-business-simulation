import { connect } from 'react-redux'
import CreateModule from '../components/createModule';

function mapStateToProps(store, props) {
  let title
  switch (props.module) {
    case 'core':
      title = 'Создать ядро'
      break
    case 'market':
      title = 'Создать рынок'
      break
    case 'acl':
      title = 'Создать ACL'
      break
    case 'token':
      title = 'Создать токен'
      break
    case 'tokenAcl':
      title = 'Создать токен ACL'
      break
    case 'ambix':
      title = 'Создать ценную бумагу'
      break
    default:
      title = '';
  }
  return {
    title,
    module: props.module
  }
}

export default connect(mapStateToProps)(CreateModule)
