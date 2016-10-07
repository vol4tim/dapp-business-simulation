import React from 'react'
import _ from 'lodash'
import { Dao } from '../../../../shared/dao'

const Main = props => (
  (<div>
    <h4>административная панель</h4>
    {!_.isEmpty(props.dao_address) &&
      <Dao />
    }
  </div>)
)

export default Main
