import { startSubmit, stopSubmit, reset } from 'redux-form';
import _ from 'lodash'
import { hashHistory } from 'react-router';
import { LOAD, ADD_MODULE } from './actionTypes'
import { loadAbiByName, getContract, blockchain, getTransaction, createModule, createModuleWatch, getModuleAddress } from '../../utils/web3'
import { promiseFor } from '../../utils/helper'
import { flashMessage } from '../app/actions'
import { loadModule as aclLoadModule } from '../acl/actions'
// import { loadModule as tokenLoadModule } from '../token/actions'
// import { loadModule as tokenAclLoadModule } from '../tokenAcl/actions'
// import { loadModule as ambixLoadModule } from '../ambix/actions'
// import { loadModule as marketLoadModule } from '../market/actions'

export function observeModules() {
  const loadModule = {
    acl: aclLoadModule,
    // token: tokenLoadModule,
    // 'token-acl': tokenAclLoadModule,
    // ambix: ambixLoadModule,
    // market: marketLoadModule
  }
  return (dispatch, getState) => {
    blockchain.setSubscribe((bl) => {
      _.forEach(bl.transactions, (txId) => {
        const info = getTransaction(txId);
        const state = getState()
        _.forEach(state.dao.blocks, (block) => {
          _.forEach(block.modules, (module) => {
            if (module.address === info.from || module.address === info.to) {
              dispatch(loadModule[block.type](module.address))
            }
          })
        })
      })
    })
  }
}

export function addModule(type, name, address) {
  return {
    type: ADD_MODULE,
    payload: {
      type,
      name,
      address
    }
  }
}

export function load(daoAddress) {
  return (dispatch) => {
    loadAbiByName('Core')
      .then((abi) => {
        const core = getContract(abi, daoAddress);
        const blocks = [
          {
            name: 'ACL',
            type: 'acl',
            modules: []
          },
          {
            name: 'Токен',
            type: 'token',
            modules: []
          },
          {
            name: 'Токен ACL',
            type: 'token-acl',
            modules: []
          },
          {
            name: 'Рынок',
            type: 'market',
            modules: []
          },
          {
            name: 'Ценная бумага',
            type: 'ambix',
            modules: []
          }
        ]
        core.call('firstModule')
          .then(firstAddress => (
            promiseFor(address => address !== '0x0000000000000000000000000000000000000000', (address) => {
              core.call('interfaceOf', [address])
                .then((type) => {
                  const block = _.find(blocks, ['type', type])
                  if (block) {
                    core.call('getModuleName', [address])
                      .then((name) => {
                        block.modules.push({
                          name,
                          address
                        })
                      })
                  }
                })
              return core.call('nextModule', [address])
            }, firstAddress)
          ))
          .then(() => core.call('name'))
          .then((name) => {
            dispatch({
              type: LOAD,
              payload: {
                address: daoAddress,
                name,
                blocks
              }
            })
          });
        // dispatch(observeModules())
      })
  }
}

export function create(dispatch, module, values) {
  let builderAddress
  let builder
  return getModuleAddress(module)
    .then((address) => {
      builderAddress = address;
      return loadAbiByName(module)
    })
    .then((abi) => {
      builder = getContract(abi, builderAddress)
      return createModule(builder, values)
    })
    .then((txId) => {
      dispatch(flashMessage('txId: ' + txId))
      return createModuleWatch(builder)
    })
}

export function setModule(dispatch, daoAddress, name, address, type) {
  return loadAbiByName('Core')
    .then((abi) => {
      const core = getContract(abi, daoAddress);
      return core.send('setModule', [name, address, type, true])
    })
    .then((txId) => {
      dispatch(flashMessage('txId: ' + txId))
      return blockchain.subscribeTx(txId)
    })
    .then(transaction => transaction.blockNumber)
}

export function submitCreateModule(form, action) {
  return (dispatch) => {
    let builder = false;
    switch (action) {
      case 'core':
        builder = 'BuilderCore'
        break
      case 'token':
        builder = 'BuilderTokenEmission'
        break
      case 'tokenAcl':
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
      dispatch(startSubmit('FormCreator'));
      create(dispatch, builder, _.values(form))
        .then((address) => {
          dispatch(stopSubmit('FormCreator'))
          dispatch(reset('FormCreator'))
          dispatch(flashMessage('address: ' + address))
          if (action !== 'core') {
            hashHistory.push('/dao/link/' + action + '/' + address)
          }
        })
        .catch((e) => {
          console.log(e);
          dispatch(stopSubmit('FormCreator'))
        })
    }
  }
}

export function submitLinkModule(daoAddress, form) {
  return (dispatch) => {
    dispatch(startSubmit('FormLinkModule'));
    setModule(dispatch, daoAddress, form.name, form.address, form.type)
      .then((blockNumber) => {
        dispatch(stopSubmit('FormLinkModule'))
        dispatch(reset('FormLinkModule'))
        dispatch(flashMessage('blockNumber: ' + blockNumber))
        dispatch(addModule(form.type, form.name, form.address))
      })
      .catch(() => {
        dispatch(stopSubmit('FormLinkModule'))
      })
  }
}

function run(dispatch, address, abiName, action, values) {
  return loadAbiByName(abiName)
    .then((abi) => {
      const contract = getContract(abi, address);
      return contract.send(action, values)
    })
    .then((txId) => {
      dispatch(flashMessage('txId: ' + txId))
      return blockchain.subscribeTx(txId)
    })
    .then(transaction => transaction.blockNumber)
}

export function submit(dispatch, formName, address, abiName, action, form) {
  dispatch(startSubmit(formName));
  return run(dispatch, address, abiName, action, _.values(form))
    .then((blockNumber) => {
      dispatch(stopSubmit(formName))
      dispatch(reset(formName))
      dispatch(flashMessage('blockNumber: ' + blockNumber))
    })
    .catch(() => {
      dispatch(stopSubmit(formName))
    })
}

export function send(dispatch, address, abiName, action, values) {
  return run(dispatch, address, abiName, action, values)
    .then((blockNumber) => {
      dispatch(flashMessage('blockNumber: ' + blockNumber))
    })
}

export function call(dispatch, formName, contract, action, form) {
  dispatch(startSubmit(formName));
  return contract.call(action, _.values(form))
    .then((result) => {
      dispatch(stopSubmit(formName))
      return result
    })
    .catch(() => {
      dispatch(stopSubmit(formName))
    })
}

export function removeModule(address, name) {
  return (dispatch) => {
    send(dispatch, address, 'Core', 'removeModule', [name])
      .then(() => {
        dispatch(load(address))
      })
  }
}
