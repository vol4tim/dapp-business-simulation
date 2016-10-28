import _ from 'lodash'
import { LOAD_MODULE } from './actionTypes'
import { getContractByAbiName, loadAbiByName, getContract, coinbase } from '../../utils/web3'
import { promiseFor } from '../../utils/helper'
import { submit as submitContract, send as sendContract } from '../dao/actions'

export function loadModule(ambixAddress) {
  return (dispatch) => {
    let ambix
    let tokenAbi
    const payload = {
      address: ambixAddress,
      sink: [],
      source: []
    }
    getContractByAbiName('Ambix', ambixAddress)
      .then((contract) => {
        ambix = contract
        return loadAbiByName('TokenEmission')
      })
      .then((abi) => {
        tokenAbi = abi
        let indexSink = 0
        return promiseFor(stopSink => !stopSink, () => {
          let decimals
          let symbol
          let token
          const sink = {}
          return ambix.call('rSink', [indexSink])
            .then((address) => {
              if (address === '0x' || address === '0x0000000000000000000000000000000000000000') {
                return true
              }
              sink.address = address
              token = getContract(tokenAbi, address);
              return token.call('decimals')
            })
            .then((result) => {
              if (result === true) {
                return true
              }
              decimals = result
              if (decimals > 0) {
                decimals = Math.pow(10, decimals)
              } else {
                decimals = 1
              }
              return token.call('symbol')
            })
            .then((result) => {
              if (result === true) {
                return true
              }
              symbol = result
              return token.call('balanceOf', [coinbase()])
            })
            .then((result) => {
              if (result === true) {
                return true
              }
              sink.balanceStr = (_.toNumber(result) / decimals) + ' ' + symbol
              return token.call('name')
            })
            .then((result) => {
              if (result === true) {
                return true
              }
              sink.name = result
              return token.call('owner')
            })
            .then((result) => {
              if (result === true) {
                return true
              }
              sink.owner = result
              sink.isOwner = (result === ambixAddress)
              return ambix.call('rSinkCoef', [indexSink])
            })
            .then((result) => {
              if (result === true) {
                return true
              }
              sink.owner = _.toNumber(result) + ' ' + symbol
              payload.sink.push(sink)
              indexSink += 1
              return false
            })
        }, false)
      })
      .then(() => {
        let indexSource = 0
        return promiseFor(stopSource => !stopSource, () => {
          let token
          let decimals
          let symbol
          let allowance
          let count
          const source = {}
          return ambix.call('rSource', [indexSource])
            .then((address) => {
              if (address === '0x' || address === '0x0000000000000000000000000000000000000000') {
                return true
              }
              source.address = address
              token = getContract(tokenAbi, address);
              return token.call('decimals')
            })
            .then((result) => {
              if (result === true) {
                return true
              }
              decimals = result
              if (decimals > 0) {
                decimals = Math.pow(10, decimals)
              } else {
                decimals = 1
              }
              return token.call('symbol')
            })
            .then((result) => {
              if (result === true) {
                return true
              }
              symbol = result
              return token.call('balanceOf', [coinbase()])
            })
            .then((result) => {
              if (result === true) {
                return true
              }
              source.balanceStr = (_.toNumber(result) / decimals) + ' ' + symbol
              return token.call('name')
            })
            .then((result) => {
              if (result === true) {
                return true
              }
              source.name = result
              return token.call('allowance', [coinbase(), ambixAddress])
            })
            .then((result) => {
              if (result === true) {
                return true
              }
              allowance = result
              return ambix.call('rSourceCoef', [0, indexSource])
            })
            .then((result) => {
              if (result === true) {
                return true
              }
              count = _.toNumber(result)
              source.count = count
              source.countStr = count + ' ' + symbol
              source.allowanceStr = allowance + ' ' + symbol
              source.isApprove = (allowance >= count)
              payload.source.push(source)
              indexSource += 1
              return false
            })
        }, false)
      })
      .then(() => {
        dispatch({
          type: LOAD_MODULE,
          payload
        })
      })
  }
}

export function submit(address, action, form) {
  return (dispatch) => {
    submitContract(dispatch, 'FormAmbix', address, 'Ambix', action, form)
      .then(() => {
        dispatch(loadModule(address))
      })
  }
}

export function send(address, action, values) {
  return (dispatch) => {
    sendContract(dispatch, address, 'Ambix', action, values)
      .then(() => {
        dispatch(loadModule(address))
      })
  }
}
