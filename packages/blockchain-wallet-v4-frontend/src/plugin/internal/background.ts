import { providers } from 'ethers'
import { openPopup } from 'plugin/internal/browser'
import { isDomainConnected, TabMetadata } from 'plugin/internal/index'
import { ConnectionEvents, ProviderMessage, RequestArguments } from 'plugin/provider/types'
import { messages, SupportedRPCMethods } from 'plugin/provider/utils'

import { transactionRequestToQueryParameters } from './transactions'

chrome.runtime.onInstalled.addListener(function () {
  // eslint-disable-next-line
  chrome.tabs.create({ url: chrome.runtime.getURL('index-tab.html#/login') }).catch((err) => console.log(err))
})

chrome.runtime.onConnect.addListener(async (port: chrome.runtime.Port) => {
  await port.postMessage({ data: { chainId: '1' }, type: ConnectionEvents.Connected })

  const metadata: TabMetadata = {
    favicon: port.sender?.tab?.favIconUrl,
    origin: port.name
  }

  const listener = async (msg: ProviderMessage) => {
    await port.postMessage(msg)

    await chrome.runtime.onMessage.removeListener(listener)
  }

  await port.onMessage.addListener(async (msg: RequestArguments) => {
    try {
      const { sessionExpiresAt } = await chrome.storage.local.get('sessionExpiresAt')
      const isSessionActive = sessionExpiresAt ? new Date(sessionExpiresAt) > new Date() : false

      const transactionParams = msg.params ? msg.params[0] : ({} as providers.TransactionRequest)

      if (isSessionActive) {
        const isConnected = await isDomainConnected(metadata.origin)
        switch (msg.method) {
          case SupportedRPCMethods.RequestAccounts:
            await chrome.runtime.onMessage.addListener(listener)
            try {
              if (isConnected) {
                const { walletAddress } = await chrome.storage.session.get('walletAddress')
                await port.postMessage({
                  data: [walletAddress],
                  type: ConnectionEvents.Connected
                })
              } else {
                // eslint-disable-next-line
                openPopup(`/plugin/connect-dapp?domain=${metadata.origin}&favicon=${metadata.favicon}`).catch((e) => console.log(e))
              }
            } catch (e) {
              await port.postMessage({
                data: e.message,
                type: ConnectionEvents.Error
              })
            }
            break
          case SupportedRPCMethods.SendTransaction:
            await chrome.runtime.onMessage.addListener(listener)
            try {
              if (isConnected) {
                // eslint-disable-next-line
                openPopup(`/plugin/send-transaction?${transactionRequestToQueryParameters(transactionParams)}`).catch((e) => console.log(e))
              } else {
                await port.postMessage({
                  data: {
                    code: 4100,
                    message: messages.errors.notAuthorized()
                  },
                  type: ConnectionEvents.Error
                })
              }
            } catch (e) {
              await port.postMessage({
                data: e.message,
                type: ConnectionEvents.Error
              })
            }
            break
          case SupportedRPCMethods.SignTransaction:
            await chrome.runtime.onMessage.addListener(listener)
            try {
              if (isConnected) {
                openPopup(
                  `/plugin/sign-transaction?domain=${metadata.origin}&favicon=${
                    metadata.favicon
                  }&${transactionRequestToQueryParameters(transactionParams)}`
                )
              } else {
                await port.postMessage({
                  data: {
                    code: 4100,
                    message: messages.errors.notAuthorized()
                  },
                  type: ConnectionEvents.Error
                })
              }
            } catch (e) {
              await port.postMessage({
                data: e.message,
                type: ConnectionEvents.Error
              })
            }
            break
          case SupportedRPCMethods.SignMessage:
            await chrome.runtime.onMessage.addListener(listener)
            try {
              if (isConnected) {
                openPopup(
                  `/plugin/signature-request?domain=${metadata.origin}&favicon=${metadata.favicon}&message=${transactionParams}`
                )
              } else {
                await port.postMessage({
                  data: {
                    code: 4100,
                    message: messages.errors.notAuthorized()
                  },
                  type: ConnectionEvents.Error
                })
              }
            } catch (e) {
              await port.postMessage({
                data: e.message,
                type: ConnectionEvents.Error
              })
            }
            break
          default:
            break
        }
      } else {
        await chrome.storage.session.clear()
        // eslint-disable-next-line
        await chrome.tabs.create({ url: chrome.runtime.getURL('index-tab.html') }).catch((err) => console.log(err))
      }
    } catch (e) {
      await port.postMessage({
        data: e.message,
        type: ConnectionEvents.Error
      })
    }
  })
})
