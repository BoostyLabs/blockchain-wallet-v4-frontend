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
  const { canWrap, formValues, isAuthenticated, isInvited, needsWrap, orderFlow } = props
  const getTotalFees = () => {
    let totalFees = new BigNumber(orderFlow?.wrapEthFees?.data?.approvalFees).multipliedBy(
      orderFlow?.wrapEthFees?.data?.gasPrice
    )
    if (canWrap && needsWrap) {
      totalFees = totalFees.plus(
        new BigNumber(orderFlow?.wrapEthFees?.data?.totalFees).multipliedBy(
          orderFlow?.wrapEthFees?.data?.gasPrice
        )
      )
    }
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
        {formValues?.coin === 'WETH' ? <WrapEthFees {...props} /> : null}
      </NftDropdown>
    </>
  )
}

type Props = OwnProps & {
  asset: NftAsset
  canWrap: boolean
  formValues: NftMakeOfferFormValues
  needsWrap: boolean
}

export default Fees
