import { startSubmit, stopSubmit, reset } from 'redux-form'
import _ from 'lodash'
import { LOAD_MODULE } from './actionTypes'
import { loadAbiByName, getContract, blockchain, tx, coinbase } from '../../utils/web3'
import { flashMessage } from '../app/actions'

export function loadModule(tokenAddress) {
  return (dispatch) => {
    loadAbiByName('TokenEmission')
      .then((abi) => {
        const token = getContract(abi, tokenAddress);
        let decimals = 1
        if (token.decimals() > 0) {
          decimals = Math.pow(10, token.decimals())
        }
        dispatch({
          type: LOAD_MODULE,
          payload: {
            address: tokenAddress,
            name: token.name(),
            totalSupply: (token.totalSupply() / decimals) + ' ' + token.symbol(),
            balance: (token.balanceOf(coinbase()) / decimals) + ' ' + token.symbol()
          }
        })
      })
  }
}

export function run(dispatch, address, func, values) {
  return loadAbiByName('TokenEmission')
    .then((abi) => {
      const token = getContract(abi, address);
      return tx(token, func, values)
    })
    .then((txId) => {
      dispatch(flashMessage('txId: ' + txId))
      return blockchain.subscribeTx(txId)
    })
    .then(transaction => transaction.blockNumber)
}

export function submit(tokenAddress, action, form) {
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
      dispatch(startSubmit('FormToken'));
      run(dispatch, tokenAddress, func, _.values(form))
        .then((blockNumber) => {
          dispatch(stopSubmit('FormToken'))
          dispatch(reset('FormToken'))
          dispatch(flashMessage('blockNumber: ' + blockNumber))
          dispatch(loadModule(tokenAddress))
        })
        .catch(() => {
          dispatch(stopSubmit('FormToken'))
        })
    }
  }
}
