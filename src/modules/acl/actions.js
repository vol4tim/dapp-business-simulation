/* eslint new-cap: 0 */
import { LOAD_MODULE } from './actionTypes'
import { getContractByAbiName } from '../../utils/web3'
import { submit as submitContract, send as sendContract } from '../dao/actions'

export function loadModule(aclAddress) {
  return (dispatch) => {
    getContractByAbiName('ACLStorage', aclAddress)
      .then((acl) => {
        try {
          acl.call('group', [0])
            .then((group) => {
              console.log('0', group);
              return acl.call('group', [1])
            })
            .then((group) => {
              console.log('1', group);
            //  return acl.call('group', [2])
            })
            // .then((group) => {
            //   console.log('2', group);
            //   return acl.call('group', [1])
            // })
            // .then((group) => {
            //   console.log('11', group);
            // })
            // .catch((e) => {
            //   console.log('s', e);
            // })
          const group = acl.get('group', [2])
          console.log('2', group);
            // .then((group) => {
            //   console.log('2', group);
            // })
        } catch (err) {
          console.log(err);
        }
        const groups = [];
        // try {
        //   let index = 0
        //   while (true) {
        //     const group = acl.group(index)
        //     const members = []
        //     for (
        //       let address = acl.memberFirst(group);
        //       address !== '0x0000000000000000000000000000000000000000';
        //       address = acl.memberNext(group, address)
        //     ) {
        //       members.push(address)
        //     }
        //     groups.push({
        //       name: group,
        //       members
        //     })
        //     index += 1
        //   }
        // } catch (err) {
        //   console.log(err);
        // }
        dispatch({
          type: LOAD_MODULE,
          payload: {
            address: aclAddress,
            groups
          }
        })
      })
  }
}

export function submit(address, action, form) {
  return (dispatch) => {
    submitContract(dispatch, 'FormAcl', address, 'ACLStorage', action, form)
      .then(() => {
        dispatch(loadModule(address))
      })
  }
}

export function send(address, action, values) {
  return (dispatch) => {
    sendContract(dispatch, address, 'ACLStorage', action, values)
      .then(() => {
        dispatch(loadModule(address))
      })
  }
}