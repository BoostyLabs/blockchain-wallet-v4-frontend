import { openPopup } from 'plugin/internal/browser'
import { isDomainConnected, TabMetadata } from 'plugin/internal/index'
import { ConnectionEvents, ProviderMessage, RequestArguments } from 'plugin/provider/types'
import { SupportedRPCMethods } from 'plugin/provider/utils'

import { getSelectedAddress } from './chromeStorage'

chrome.runtime.onInstalled.addListener(function () {
  // eslint-disable-next-line
  chrome.tabs.create({ url: chrome.runtime.getURL('index-tab.html') }).catch((err) => console.log(err))
})

chrome.runtime.onConnect.addListener(function (port: chrome.runtime.Port) {
  port.postMessage({ data: { chainId: '1' }, type: ConnectionEvents.Connected })

  const metadata: TabMetadata = {
    favicon: port.sender?.tab?.favIconUrl,
    origin: port.name
  }

  // USE THIS TO TEST DISCONNECTION
  // setTimeout(() => {
  //   port.disconnect()
  // }, 10000)

  port.onMessage.addListener(async (msg: RequestArguments) => {
    const listener = (msg: ProviderMessage) => {
      port.postMessage(msg)

      chrome.runtime.onMessage.removeListener(listener)
    }

    if (msg.method === SupportedRPCMethods.RequestAccounts) {
      chrome.runtime.onMessage.addListener(listener)

      const isConnected = await isDomainConnected(metadata.origin)

      if (isConnected) {
        const address = await getSelectedAddress()
        port.postMessage({
          data: address,
          type: SupportedRPCMethods.RequestAccounts
        })

        return
      }
      // eslint-disable-next-line
      openPopup(`/plugin/connect-dapp?domain=${metadata.origin}&favicon=${metadata.favicon}`).catch((e) => console.log(e))
    }
  })
})
