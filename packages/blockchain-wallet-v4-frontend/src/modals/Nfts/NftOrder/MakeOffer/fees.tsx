import React from 'react'
import BigNumber from 'bignumber.js'

import { displayCoinToCoin } from '@core/exchange'
import { NftAsset } from '@core/network/api/nfts/types'

import NftDropdown from '../../components/NftDropdown'
import { Props as OwnProps } from '..'
import { NftMakeOfferFormValues } from '.'
import CreateOfferFees from './CreateOffer.fees'
import WrapEthFees from './WrapEth.fees'

const Fees: React.FC<Props> = (props) => {
  const { isAuthenticated, isInvited } = props

  const getTotalFees = () => {
    const totalFees = new BigNumber(props?.orderFlow?.wrapEthFees?.data?.approvalFees)
      .multipliedBy(props?.orderFlow?.wrapEthFees?.data?.gasPrice)
      .plus(
        new BigNumber(props?.orderFlow?.wrapEthFees?.data?.totalFees).multipliedBy(
          props?.orderFlow?.wrapEthFees?.data?.gasPrice
        )
      )
    if (totalFees.isNaN()) return '⚠️'
    const totalString = totalFees.toString()
    const total = displayCoinToCoin({ coin: 'ETH', value: totalString })
    return total
  }

  if (!isAuthenticated) return null
  if (!isInvited) return null

  return (
    <>
      <NftDropdown title='Total Fees' hasPadding titleRight={getTotalFees()}>
        <CreateOfferFees {...props} />
        {props.formValues?.coin === 'WETH' ? <WrapEthFees {...props} /> : null}
      </NftDropdown>
    </>
  )
}

type Props = OwnProps & { asset: NftAsset; formValues: NftMakeOfferFormValues }

export default Fees
