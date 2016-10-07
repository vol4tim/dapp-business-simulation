/* eslint react/prefer-stateless-function: 0*/
import React, { PropTypes, Component } from 'react'
import Form from '../containers/form'

class Main extends Component {
  render() {
    const { title, address, action } = this.props

    return (<div>
      <h4>{title}</h4>
      <p>
        <button onClick={this.context.router.goBack} className="btn btn-default">Назад</button>
      </p>
      <Form ambixAddress={address} action={action} />
    </div>)
  }
}

Main.contextTypes = {
  router: PropTypes.object
}

export default Main
