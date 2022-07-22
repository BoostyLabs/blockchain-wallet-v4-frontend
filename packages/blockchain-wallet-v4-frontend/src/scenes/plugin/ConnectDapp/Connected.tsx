import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { IconCheckCircle } from '@blockchain-com/icons'
import { addConnection, TabMetadata } from 'plugin/internal'
import { getSigner } from 'plugin/internal/signer'
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
  password: string
}> = ({ metadata, password }) => {
  const mnemonicTask = useSelector((state) => selectors.core.wallet.getMnemonic(state, password))

  useEffect(() => {
    const timeout = setTimeout(async () => {
      try {
        await addConnection(metadata.origin)

        const signer = await getSigner(mnemonicTask)
        const address = await signer.getAddress()
        await chrome.runtime.sendMessage({
          data: address,
          type: SupportedRPCMethods.RequestAccounts
        })
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

  return <ConnectedIcon width='137px' height='137px' />
}
