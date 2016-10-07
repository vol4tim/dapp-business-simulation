import React from 'react'
import _ from 'lodash'
import { Dao } from '../../../../shared/dao'

const Main = props => (
  (<div>
    {!_.isEmpty(props.dao_address) &&
      <Dao role={props.role} />
    }
  </div>)
)

export default Main
