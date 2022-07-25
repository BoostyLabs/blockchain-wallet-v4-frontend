import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { IconCheckCircle } from '@blockchain-com/icons'
import { addConnection, TabMetadata } from 'plugin/internal'
import { SupportedRPCMethods } from 'plugin/provider/utils'
import styled, { keyframes } from 'styled-components'

import { selectors } from 'data'

const showingFrames = keyframes`
  from { opacity: 0; transform: scale(0.1) }
  to { opacity: 1; transform: scale(1)}
`

const ConnectedIcon = styled(IconCheckCircle)`
  animation: ${showingFrames} 2s ease-in-out;
  color: ${(props) => props.theme.white};
`
export const Connected: React.FC<{
  metadata: TabMetadata
}> = ({ metadata }) => {
  const walletAddress = useSelector((state) =>
    selectors.core.kvStore.eth.getDefaultAddress(state).getOrElse('')
  )

  useEffect(() => {
    const timeout = setTimeout(async () => {
      try {
        await addConnection(metadata.origin)
        window.close()
      } catch (e) {
        // eslint-disable-next-line
        console.log(e)
      }
    }, 2000)
    return () => {
      clearTimeout(timeout)
    }
  }, [])

  useEffect(() => {
    if (!walletAddress) return

    chrome.runtime.sendMessage({
      data: walletAddress,
      type: SupportedRPCMethods.RequestAccounts
    })
  }, [walletAddress])

  return <ConnectedIcon width='137px' height='137px' />
}
