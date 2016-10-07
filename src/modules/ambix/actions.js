/* eslint no-constant-condition: 0 */
import { startSubmit, stopSubmit, reset } from 'redux-form'
import _ from 'lodash'
import { LOAD_MODULE } from './actionTypes'
import { loadAbiByName, getContract, blockchain, tx, coinbase } from '../../utils/web3'
import { flashMessage } from '../app/actions'

export function loadModule(ambixAddress) {
  return (dispatch) => {
    let tokenAbi
    loadAbiByName('TokenEmission')
      .then((abi) => {
        tokenAbi = abi
        return loadAbiByName('Ambix')
      })
      .then((abi) => {
        const ambix = getContract(abi, ambixAddress);
        const sink = [];
        const source = [];
        let indexSink = 0
        let stopSink = false
        while (!stopSink) {
          const address = ambix.rSink(indexSink)
          if (address === '0x') {
            stopSink = true
          } else {
            const token = getContract(tokenAbi, address);
            let decimals = 1
            if (token.decimals() > 0) {
              decimals = Math.pow(10, token.decimals())
            }
            const owner = token.owner()
            sink.push({
              address,
              name: token.name(),
              countStr: _.toNumber(ambix.rSinkCoef(indexSink)) + ' ' + token.symbol(),
              balanceStr: (token.balanceOf(coinbase()) / decimals) + ' ' + token.symbol(),
              owner,
              isOwner: (owner === ambixAddress)
            })
            indexSink += 1
          }
        }
        let indexSource = 0
        let stopSource = false
        while (!stopSource) {
          const address = ambix.rSource(0, indexSource)
          if (address === '0x') {
            stopSource = true
          } else {
            const token = getContract(tokenAbi, address);
            let decimals = 1
            if (token.decimals() > 0) {
              decimals = Math.pow(10, token.decimals())
            }
            const allowance = token.allowance(coinbase(), ambixAddress)
            const count = _.toNumber(ambix.rSourceCoef(0, indexSource))
            source.push({
              address,
              name: token.name(),
              count,
              countStr: count + ' ' + token.symbol(),
              balanceStr: (token.balanceOf(coinbase()) / decimals) + ' ' + token.symbol(),
              allowanceStr: allowance + ' ' + token.symbol(),
              isApprove: (allowance >= count)
            })
            indexSource += 1
          }
        }
        dispatch({
          type: LOAD_MODULE,
          payload: {
            address: ambixAddress,
            sink,
            source
          }
        })
      })
  }
}

function run(dispatch, address, func, values) {
  return loadAbiByName('Ambix')
    .then((abi) => {
      const ambix = getContract(abi, address);
      return tx(ambix, func, values)
    })
    .then((txId) => {
      dispatch(flashMessage('txId: ' + txId))
      return blockchain.subscribeTx(txId)
    })
    .then(transaction => transaction.blockNumber)
}

export function submit(ambixAddress, action, form) {
  return (dispatch) => {
    dispatch(startSubmit('FormAmbix'));
    let func
    let values
    switch (action) {
      case 'source':
        func = 'setSource'
        values = [0, _.map(form.token, 'address'), _.map(form.token, 'count')]
        break
      case 'sink':
        func = 'setSink'
        values = [_.map(form.token, 'address'), _.map(form.token, 'count')]
        break
      case 'run':
        func = 'run'
        values = form
        break
      default:
        func = false;
    }
    if (func) {
      run(dispatch, ambixAddress, func, values)
        .then((blockNumber) => {
          dispatch(stopSubmit('FormAmbix'))
          dispatch(reset('FormAmbix'))
          dispatch(flashMessage('blockNumber: ' + blockNumber))
          dispatch(loadModule(ambixAddress))
        })
        .catch(() => {
          dispatch(stopSubmit('FormAmbix'))
        })
    }
  }
}
