/* eslint no-constant-condition: 0 */
import { startSubmit, stopSubmit, reset } from 'redux-form'
import _ from 'lodash'
import { LOAD_MODULE } from './actionTypes'
import { loadAbiByName, getContract, blockchain, tx } from '../../utils/web3'
import { flashMessage } from '../app/actions'

export function loadModule(aclAddress) {
  return (dispatch) => {
    loadAbiByName('ACLStorage')
      .then((abi) => {
        const acl = getContract(abi, aclAddress);
        const groups = [];
        try {
          let index = 0
          while (true) {
            const group = acl.group(index)
            const members = []
            for (
              let address = acl.memberFirst(group);
              address !== '0x0000000000000000000000000000000000000000';
              address = acl.memberNext(group, address)
            ) {
              members.push(address)
            }
            groups.push({
              name: group,
              members
            })
            index += 1
          }
        } catch (err) {
          console.log(err);
        }
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

function run(dispatch, address, func, values) {
  return loadAbiByName('ACLStorage')
    .then((abi) => {
      const acl = getContract(abi, address);
      return tx(acl, func, values)
    })
    .then((txId) => {
      dispatch(flashMessage('txId: ' + txId))
      return blockchain.subscribeTx(txId)
    })
    .then(transaction => transaction.blockNumber)
}

export function submit(aclAddress, action, form) {
  return (dispatch) => {
    dispatch(startSubmit('FormAcl'));
    let func
    switch (action) {
      case 'group':
        func = 'createGroup'
        break
      case 'member':
        func = 'addMember'
        break
      default:
        func = false;
    }
    if (func) {
      run(dispatch, aclAddress, func, _.values(form))
        .then((blockNumber) => {
          dispatch(stopSubmit('FormAcl'))
          dispatch(reset('FormAcl'))
          dispatch(flashMessage('blockNumber: ' + blockNumber))
          dispatch(loadModule(aclAddress))
        })
        .catch(() => {
          dispatch(stopSubmit('FormAcl'))
        })
    }
  }
}
