import { startSubmit, stopSubmit, reset } from 'redux-form';
import _ from 'lodash';
import { ADD } from './actionTypes'
import { flashMessage } from '../app/actions'
import { addModule } from '../dao/actions'
import {
  loadAbiByName, getContract, createModule, createModuleWatch, blockchain, tx, getModuleAddress
} from '../../utils/web3'

export function create(dispatch, module, values) {
  let builderAddress
  return getModuleAddress(module)
    .then((address) => {
      builderAddress = address;
      return loadAbiByName(module)
    })
    .then((abi) => {
      const builder = getContract(abi, builderAddress)
      const txId = createModule(builder, values)
      dispatch(flashMessage('txId: ' + txId))
      return createModuleWatch(builder)
    })
}

export function setModule(dispatch, daoAddress, name, address, type) {
  return loadAbiByName('Core')
    .then((abi) => {
      const core = getContract(abi, daoAddress);
      return tx(core, 'setModule', [name, address, type, true])
    })
    .then((txId) => {
      dispatch(flashMessage('txId: ' + txId))
      return blockchain.subscribeTx(txId)
    })
    .then(transaction => transaction.blockNumber)
}

export function submit(form, action) {
  return (dispatch, getState) => {
    const state = getState()
    dispatch(startSubmit('FormCreator'));
    if (action === 'module') {
      setModule(dispatch, state.app.dao_address, form.name, form.address, form.type)
        .then((blockNumber) => {
          dispatch(stopSubmit('FormCreator'))
          dispatch(reset('FormCreator'))
          dispatch(flashMessage('blockNumber: ' + blockNumber))
          dispatch(addModule(form.type, form.name, form.address))
        })
        .catch(() => {
          dispatch(stopSubmit('FormCreator'))
        })
    }
    let builder
    switch (action) {
      case 'core':
        builder = 'BuilderCore'
        break
      case 'token':
        builder = 'BuilderTokenEmission'
        break
      case 'token-provider':
        builder = 'BuilderTokenEmissionACL'
        break
      case 'market':
        builder = 'BuilderMarket'
        break
      case 'ambix':
        builder = 'BuilderAmbix'
        break
      case 'acl':
        builder = 'BuilderACLStorage'
        break
      default:
        builder = false;
    }
    if (builder) {
      create(dispatch, builder, _.values(form))
        .then((address) => {
          dispatch(stopSubmit('FormCreator'))
          dispatch(reset('FormCreator'))
          dispatch(flashMessage('address: ' + address))
          dispatch({
            type: ADD,
            payload: {
              address
            }
          })
        })
        .catch(() => {
          dispatch(stopSubmit('FormCreator'))
        })
    }
  }
}
