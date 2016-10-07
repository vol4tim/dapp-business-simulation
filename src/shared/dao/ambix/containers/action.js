import { connect } from 'react-redux'
import { Action } from '../components';

function mapStateToProps(store, props) {
  let title
  switch (props.action) {
    case 'source':
      title = 'Состав ценной бумаги'
      break
    case 'sink':
      title = 'Выпускаемый токен'
      break
    case 'run':
      title = 'Эмиссия'
      break
    default:
      title = '';
  }
  return {
    title,
    address: props.address,
    action: props.action
  }
}

export default connect(mapStateToProps)(Action)
