import { openPopup } from 'plugin/internal/browser'
import { ConnectionEvents, ProviderMessage, RequestArguments } from 'plugin/provider/types'

chrome.runtime.onInstalled.addListener(function () {
  // eslint-disable-next-line
  chrome.tabs.create({ url: chrome.runtime.getURL('index-tab.html') }).catch((err) => console.log(err))
})

chrome.runtime.onConnect.addListener(function (port: chrome.runtime.Port) {
  port.postMessage({ data: { chainId: '1' }, type: ConnectionEvents.Connected })

  // USE THIS TO TEST DISCONNECTION
  // setTimeout(() => {
  //   port.disconnect()
  // }, 10000)

  port.onMessage.addListener((msg: RequestArguments) => {
    if (msg.method === 'eth_requestAccounts') {
      const listener = (msg: ProviderMessage) => {
        port.postMessage(msg)

        chrome.runtime.onMessage.removeListener(listener)
      }

      chrome.runtime.onMessage.addListener(listener)

      // eslint-disable-next-line
      openPopup(`/test?domain=${port.name}`).catch((e) => console.log(e))
    }
  })
})
