import React, { useEffect } from 'react'
import { IconBlockchainCircle } from '@blockchain-com/icons'
import { TabMetadata } from 'plugin/internal'
import styled, { keyframes } from 'styled-components'

import { Flex } from 'components/Flex'

import { ConnectStep } from '.'

const blockchainIconFrames = keyframes`
  0% { opacity: 0; transform: scale(0.1) }
  50% { opacity: 1; transform: scale(1)}
  90% { opacity: 1; transform: scale(1) translateX(96px)}
  100% { opacity: 0; transform: scale(1) translateX(96px)}
`
const siteIconFrames = keyframes`
  0% { opacity: 0; transform: scale(0.1) }
  50% { opacity: 1; transform: scale(1)}
  90% { opacity: 1; transform: scale(1) translateX(-96px)}
  100% { opacity: 0; transform: scale(1) translateX(-96px)}
`
const BlockchainIcon = styled(IconBlockchainCircle)`
  color: ${(props) => props.theme.white};
  z-index: 2;
  animation: ${blockchainIconFrames} 2s ease-in both;
`
const SiteIconContainer = styled('picture')`
  animation: ${siteIconFrames} 2s ease-in both;
  max-width: 120px;
  max-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 60px;
`
const ConnectingWrapper = styled(Flex)`
  width: 100%;
  justify-content: space-between;
`
export const Connecting: React.FC<{
  metadata: TabMetadata
  setConnectStep: React.Dispatch<React.SetStateAction<ConnectStep>>
}> = ({ metadata, setConnectStep }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      setConnectStep(ConnectStep.Connected)
    }, 2000)
    return () => {
      clearTimeout(timeout)
    }
  }, [setConnectStep])

  return (
    <ConnectingWrapper>
      <BlockchainIcon width='120px' height='120px' />
      <SiteIconContainer>
        <source srcSet={metadata.favicon} />
        <img src='../../../assets/favicon.png' alt='icon' />
      </SiteIconContainer>
    </ConnectingWrapper>
  )
}
