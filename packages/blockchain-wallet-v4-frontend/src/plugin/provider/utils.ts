import { ethErrors } from 'eth-rpc-errors'
import { providers } from 'ethers'

export const messages = {
  errors: {
    invalidRequestArgs: () => `Expected a single, non-array, object argument.`,
    invalidRequestMethod: () => `'args.method' must be a non-empty string.`,
    invalidRequestParams: () => `'args.params' must be an object or array if provided.`,
    invalidSendTransactionRequestParams: () =>
      `Invalid parameters: must provide an Ethereum address`,
    invalidSendTransactionRequestParamsMissingTo: () =>
      `Invalid transaction params: must specify 'to' for all other types of transactions. `,
    invalidSendTransactionRequestParamsTo: () => `Invalid 'to' address.`,
    invalidSendTransactionRequestParamsValue: () => `Invalid 'value'`,
    permanentlyDisconnected: () =>
      'Blockchain.com: Disconnected from extension background. Page reload required.',
    unsupportedRPCMethod: (method: string) =>
      `Blockchain.com doesn't support this RPC method. ${method}`,
    userRejectedRequest: () => `User rejected request.`
  },
  info: {
    connected: (chainId: string) => `Blockchain.com: Connected to chain with ID "${chainId}".`
  }
}

export enum SupportedRPCMethods {
  RequestAccounts = 'eth_requestAccounts',
  Send = 'eth_sendTransaction',
  SendRaw = 'eth_sendRawTransaction',
  SignMessage = 'eth_sign',
  SignTransaction = 'eth_signTransaction'
}

export const isTransactionParametersType = (transactionsParameter: any) =>
  !!(transactionsParameter.to && transactionsParameter.value)

export const isValidEthAddress = (address: string) => /^0x[a-fA-F0-9]{40}$/.test(address)

export const validateSendTransactionRequestParams = (params) => {
  ;(params as providers.TransactionRequest[]).forEach((param) => {
    if (!isTransactionParametersType(param)) {
      throw ethErrors.provider.custom({
        code: 1001,
        message: messages.errors.invalidSendTransactionRequestParams()
      })
    }

    if (!param.to) {
      throw ethErrors.provider.custom({
        code: 1001,
        message: messages.errors.invalidSendTransactionRequestParamsMissingTo()
      })
    }

    if (!isValidEthAddress(param.to)) {
      throw ethErrors.provider.custom({
        code: 1001,
        message: messages.errors.invalidSendTransactionRequestParamsMissingTo()
      })
    }

    if (parseInt(String(param.value), 16) < 0) {
      throw ethErrors.provider.custom({
        code: 1001,
        message: messages.errors.invalidSendTransactionRequestParamsValue()
      })
    }
  })
}
