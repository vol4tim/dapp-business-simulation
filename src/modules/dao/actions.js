import _ from 'lodash'
import { LOAD, ADD_MODULE } from './actionTypes'
import { loadAbiByName, getContract, blockchain, getTransaction } from '../../utils/web3'
import { loadModule as aclLoadModule } from '../acl/actions'
import { loadModule as tokenLoadModule } from '../token/actions'
import { loadModule as tokenAclLoadModule } from '../tokenAcl/actions'
import { loadModule as ambixLoadModule } from '../ambix/actions'
import { loadModule as marketLoadModule } from '../market/actions'

export function observeModules() {
  const loadModule = {
    acl: aclLoadModule,
    token: tokenLoadModule,
    'token-provider': tokenAclLoadModule,
    ambix: ambixLoadModule,
    market: marketLoadModule
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
              if (block.type === 'token' || block.type === 'token-provider') {
                _.forEach(_.filter(state.dao.blocks, { type: 'market' }).modules, (moduleMarket) => {
                  dispatch(loadModule.market(moduleMarket.address))
                })
              }
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
        const blocks = []
        for (
          let address = core.firstModule();
          address !== '0x0000000000000000000000000000000000000000';
          address = core.nextModule(address)
        ) {
          const type = core.interfaceOf(address)
          const block = _.find(blocks, ['type', type])
          if (block) {
            block.modules.push({
              name: core.getModuleName(address),
              address
            })
          } else {
            let nameBlock
            switch (type) {
              case 'token':
                nameBlock = 'Токен'
                break
              case 'token-provider':
                nameBlock = 'Токен поставщика'
                break
              case 'market':
                nameBlock = 'Рынок'
                break
              case 'ambix':
                nameBlock = 'Ценная бумага'
                break
              case 'acl':
                nameBlock = 'ACL'
                break
              default:
                nameBlock = false;
            }
            if (nameBlock) {
              blocks.push({
                name: nameBlock,
                type,
                modules: [
                  {
                    name: core.getModuleName(address),
                    address
                  }
                ]
              })
            }
          }
        }

        dispatch({
          type: LOAD,
          payload: {
            address: daoAddress,
            name: core.name(),
            blocks
          }
        })
        dispatch(observeModules())
        return blocks
      })
  }
}
