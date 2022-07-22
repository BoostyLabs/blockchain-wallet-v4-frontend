import { ethers } from 'ethers'

import { utils } from '@core'

const taskToPromise = (t) => new Promise((resolve, reject) => t.fork(reject, resolve))

export const getSigner = async (mnemonicTask): Promise<ethers.Wallet> => {
  const RPC_API_ENDPOINT = 'https://api.blockchain.info/eth/nodes/rpc'

  const mnemonic = await taskToPromise(mnemonicTask)
  const privateKey = utils.eth.getPrivateKey(mnemonic, 0)
  return new ethers.Wallet(privateKey, ethers.providers.getDefaultProvider(RPC_API_ENDPOINT))
}
