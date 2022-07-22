// @ts-nocheck
import { openPopup } from 'plugin/internal/browser'
import { clearSession, isSessionActive } from 'plugin/internal/chromeStorage'
import { TabMetadata } from 'plugin/internal/index'
import { ConnectionEvents, ProviderMessage, RequestArguments } from 'plugin/provider/types'
import { SupportedRPCMethods } from 'plugin/provider/utils'

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

  port.onMessage.addListener(async function (msg: RequestArguments) {
    const listener = (msg: ProviderMessage) => {
      port.postMessage(msg)

      chrome.runtime.onMessage.removeListener(listener)
    }

    console.log('1')

    console.log('2')
    const isCurrentSessionActive = await isSessionActive()
    console.log('3')
    // if (!isCurrentSessionActive) {
    //   // await clearSession()
    //   // port.postMessage({
    //   //   data: 'BCDC session expired. Please reauthenticate',
    //   //   type: ConnectionEvents.Error
    //   // })
    //   console.log('4')
    //   chrome.tabs.create({ url: chrome.runtime.getURL('index-tab.html') })
    // }

    // try {
    //
    // } catch (e) {
    //   console.log('5')
    //   port.postMessage({
    //     data: e.message,
    //     type: ConnectionEvents.Error
    //   })
    // }

    console.log('6')

    switch (msg.method) {
      case SupportedRPCMethods.RequestAccounts:
        chrome.runtime.onMessage.addListener(listener)

        // eslint-disable-next-line
        openPopup(`/plugin/connect-dapp?domain=${metadata.origin}&favicon=${metadata.favicon}`).catch((e) => console.log(e))
        break
      default:
    }
  })
})
