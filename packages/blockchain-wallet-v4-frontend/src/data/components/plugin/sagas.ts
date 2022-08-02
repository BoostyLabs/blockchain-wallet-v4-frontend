import BIP39 from 'bip39-light'
import { ethers } from 'ethers'
import { getSessionPayload } from 'plugin/internal/chromeStorage'
import { path } from 'ramda'
import { call, put, select } from 'redux-saga/effects'

import { APIType } from '@core/network/api'
import { getPrivateKey } from '@core/utils/eth'
import { WALLET_SIGNER_ERR } from 'data/components/nfts/sagas'

import { actions as A } from './slice'

export const logLocation = 'components/nfts/sagas'

export default ({ api, coreSagas, networks }: { api: APIType; coreSagas; networks }) => {
  const getWallet = function* () {
    try {
      const wrapper = yield getSessionPayload()
      const mnemonic = BIP39.entropyToMnemonic(wrapper.wallet.hd_wallets._tail.array[0].seedHex)
      const privateKey = getPrivateKey(mnemonic)
      const wallet = new ethers.Wallet(privateKey, api.ethProvider)
      yield put(A.setWallet(wallet))
      return wallet
    } catch (e) {
      throw new Error(`Failed to get address. ${e}`)
    }
  }

  const getPublicAddress = function* () {
    try {
      const signer: ethers.Wallet = yield call(getWallet)
      const address = yield signer.getAddress()
      yield put(A.setPublicAddress(address))
    } catch (e) {
      throw new Error(`Failed to get wallet. ${e}`)
    }
  }

  const initTransactionRequestParameters = function* (action) {
    /* eslint-disable */
    let { chainId, from, to, data, gasLimit, value, nonce } = action.payload
    try {
      const wallet = yield call(getWallet)

      let payment = coreSagas.payment.eth.create({
        network: networks.eth
      })
      payment = yield payment.init({ coin: 'ETH', isErc20: false })

      if (!from) {
        from = yield wallet.getAddress()
      }

      if (!gasLimit) {
        gasLimit = path(['fees', 'gasLimit'], payment.value())
      }

      const feeData = yield wallet.getFeeData()
      const maxFeePerGas = feeData.maxFeePerGas._hex
      const maxPriorityFeePerGas = feeData.maxPriorityFeePerGas._hex

      //@ts-ignore
      yield put(A.setTransactionRequest({ from, to, gasLimit, data, value, nonce, maxPriorityFeePerGas, maxFeePerGas }))
    } catch (e) {
      throw new Error(`Failed to init transaction. ${e}`)
    }
  }

  const sendTransaction = function* (action) {
    try {
      const wallet: ethers.Wallet = yield call(getWallet)
      wallet.sendTransaction(action.payload)
    } catch (e) {
      throw new Error(`Failed to send transaction. ${e}`)

    }
  }

  return {
    getPublicAddress,
    getWallet,
    initTransactionRequestParameters,
    sendTransaction
  }
}
