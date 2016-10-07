import _ from 'lodash'
import { LOAD_MODULE } from './actionTypes'

const initialState = {
  modules: [
    // {
    //   address: '0444444444444444',
    //   sink: [
    //     {
    //       address: '011111111111',
    //       name: 'рубль',
    //       countStr: '40',
    //       balanceStr: '40'
    //       owner: '012122121',
    //       isOwner: true
    //     }
    //   ],
    //   source: [
    //     {
    //       address: '011111111111',
    //       name: 'рубль',
    //       countStr: '40',
    //       balanceStr: '40'
    //       allowanceStr: '40'
    //       isApprove: true
    //     }
    //   ]
    // }
  ]
}

export default function ambix(state = initialState, action) {
  switch (action.type) {
    case LOAD_MODULE: {
      const module = _.find(state.modules, ['address', action.payload.address])
      let modules
      if (module) {
        modules = state.modules.map((item) => {
          if (item.address === action.payload.address) {
            return {
              ...item,
              sink: action.payload.sink,
              source: action.payload.source
            }
          }
          return item
        })
      } else {
        modules = [
          ...state.modules,
          action.payload
        ]
      }
      return { ...state, modules }
    }

    default:
      return state;
  }
}
