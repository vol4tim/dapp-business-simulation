import { startSubmit, stopSubmit, reset } from 'redux-form'
import _ from 'lodash'
import { LOAD_MODULE } from './actionTypes'
import { loadAbiByName, getContract, blockchain, tx, coinbase } from '../../utils/web3'
import { flashMessage } from '../app/actions'

export function loadModule(tokenAclAddress) {
  return (dispatch) => {
    loadAbiByName('TokenEmissionACL')
      .then((abi) => {
        const tokenAcl = getContract(abi, tokenAclAddress);
        let decimals = 1
        if (tokenAcl.decimals() > 0) {
          decimals = Math.pow(10, tokenAcl.decimals())
        }
        dispatch({
          type: LOAD_MODULE,
          payload: {
            address: tokenAclAddress,
            name: tokenAcl.name(),
            totalSupply: (tokenAcl.totalSupply() / decimals) + ' ' + tokenAcl.symbol(),
            balance: (tokenAcl.balanceOf(coinbase()) / decimals) + ' ' + tokenAcl.symbol(),
            // acl: tokenAcl.acl.address,
            aclGroup: tokenAcl.emitentGroup()
          }
        })
      })
  }
}

export function run(dispatch, address, func, values) {
  return loadAbiByName('TokenEmissionACL')
    .then((abi) => {
      const tokenAcl = getContract(abi, address);
      return tx(tokenAcl, func, values)
    })
    .then((txId) => {
      dispatch(flashMessage('txId: ' + txId))
      return blockchain.subscribeTx(txId)
    })
    .then(transaction => transaction.blockNumber)
}

export function submit(tokenAclAddress, action, form) {
  return (dispatch) => {
    let func
    switch (action) {
      case 'transfer':
        func = 'transfer'
        break
      case 'approve':
        func = 'approve'
        break
      case 'emission':
        func = 'emission'
        break
      default:
        func = false;
    }
    if (func) {
      dispatch(startSubmit('FormTokenAcl'));
      run(dispatch, tokenAclAddress, func, _.values(form))
        .then((blockNumber) => {
          dispatch(stopSubmit('FormTokenAcl'))
          dispatch(reset('FormTokenAcl'))
          dispatch(flashMessage('blockNumber: ' + blockNumber))
          dispatch(loadModule(tokenAclAddress))
        })
        .catch(() => {
          dispatch(stopSubmit('FormTokenAcl'))
        })
    }
  }
}
