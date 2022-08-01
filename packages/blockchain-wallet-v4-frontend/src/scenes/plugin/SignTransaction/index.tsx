import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { IconBlockchainCircle } from '@blockchain-com/icons'
import BIP39 from 'bip39-light'
import { BigNumberish, BytesLike, ethers, providers, utils } from 'ethers'
import { TabMetadata } from 'plugin/internal'
import { getSessionPayload } from 'plugin/internal/chromeStorage'
import styled from 'styled-components'

import { getPrivateKey } from '@core/utils/eth'
import { Text } from 'blockchain-info-components'

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 19px;
`

const SiteIconContainer = styled('div')`
  width: 78px;
  height: 78px;
  border-radius: 50%;
  overflow: auto;
`

const SiteIcon = styled('img')`
  width: 100%;
`

const BlockchainIcon = styled(IconBlockchainCircle)`
  color: ${(props) => props.theme.white};
`

const Title = styled(Text)`
  margin: 19px auto 12px;
  font-size: 20px;
  font-weight: 700;
  line-height: 30px;
  text-align: center;
  color: ${(props) => props.theme.white};
`

const TransactionData = styled(Text)`
  width: 100%;
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: 0em;
  text-align: left;
`

const Origin = styled(TransactionData)`
  margin-bottom: 73px;
  text-align: center;
`

const Subtitle = styled(Text)`
  margin-bottom: 7px;
  width: 100%;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: left;
`

class Transaction implements providers.TransactionRequest {
  /* eslint-disable no-useless-constructor */
  constructor(
    public to: string = '',
    public from: string = '',
    public nonce: BigNumberish = '',
    public gasLimit: BigNumberish = '',
    public gasPrice: BigNumberish = '',
    public data: BytesLike = '',
    public value: BigNumberish = '',
    public chainId: number = 0
  ) {}
}

const SignTransaction = (props) => {
  const [metadata, setMetedata] = useState<TabMetadata>({ origin: '' })
  const [transactionRequest, setTransactionRequest] = useState<Transaction>(new Transaction())

  const signTransaction = async () => {
    const wrapper = await getSessionPayload()
    const mnemonic = BIP39.entropyToMnemonic(wrapper.wallet.hd_wallets._tail.array[0].seedHex)
    const privateKey = getPrivateKey(mnemonic)
    const wallet = new ethers.Wallet(privateKey)
    const signedTransaction = await wallet.signTransaction(transactionRequest)
  }

  useEffect(() => {
    const params = new URLSearchParams(props.history.location.search)
    setMetedata({
      favicon: params.get('favicon') || '',
      origin: params.get('domain') || ''
    })

    setTransactionRequest(
      new Transaction(
        params.get('to') || '',
        params.get('from') || '',
        params.get('nonce') || '',
        params.get('gasLimit') || '',
        params.get('gasPrice') || '',
        params.get('data') || '',
        params.get('value') || '',
        Number(params.get('chainId')) || 0
      )
    )
  }, [props.history.location.search])

  return (
    <Wrapper>
      {metadata.favicon ? (
        <SiteIconContainer>
          <SiteIcon src={metadata.favicon} alt='icon' />
        </SiteIconContainer>
      ) : (
        <BlockchainIcon width='78px' height='78px' />
      )}
      <Title>
        <FormattedMessage
          id='scenes.plugin.sign_transaction.heading'
          defaultMessage='Sign transaction'
        />
      </Title>
      <Origin>{metadata.origin}</Origin>
      <Subtitle>
        <FormattedMessage id='scenes.plugin.sign_transaction.to' defaultMessage='To account' />
      </Subtitle>
      <TransactionData color='white'>{`${transactionRequest.to.slice(
        0,
        5
      )}...${transactionRequest.to.slice(-4)}`}</TransactionData>
      <TransactionData>{`${transactionRequest.value} ETH`}</TransactionData>
    </Wrapper>
  )
}

export default SignTransaction
