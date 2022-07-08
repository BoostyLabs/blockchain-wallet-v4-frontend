import React from 'react'
import { FormattedMessage } from 'react-intl'
import { useDispatch } from 'react-redux'

import { Remote } from '@core'
import { Button, HeartbeatLoader, Link, Text } from 'blockchain-info-components'
import CoinDisplay from 'components/Display/CoinDisplay'
import FiatDisplay from 'components/Display/FiatDisplay'
import { Flex } from 'components/Flex'
import { Row } from 'components/Flyout'
import FlyoutHeader from 'components/Flyout/Header'
import { actions } from 'data'
import { Analytics } from 'data/types'
import { useRemote } from 'hooks'

import { NftFlyoutRow, StickyCTA } from '../../components'
import NftAssetHeaderRow from '../../components/NftAssetHeader'
import NftFlyoutFailure from '../../components/NftFlyoutFailure'
import NftFlyoutLoader from '../../components/NftFlyoutLoader'
import { Props as OwnProps } from '..'
import CancelListingFees from './fees'

const CancelListing: React.FC<Props> = (props) => {
<<<<<<< Updated upstream
  const { close, isInvited, nftActions, openSeaAssetR, orderFlow } = props
  const { listingToCancel } = orderFlow
=======
  const { close, openSeaAssetR, orderFlow } = props
  const { seaportOrder } = orderFlow
>>>>>>> Stashed changes

  const dispatch = useDispatch()
  const cancelListingClicked = () => {
    dispatch(
      actions.analytics.trackEvent({
        key: Analytics.NFT_CANCEL_LISTING_CLICKED,
        properties: {}
      })
    )
  }

  const openSeaAsset = useRemote(() => openSeaAssetR)

  const disabled = Remote.Loading.is(orderFlow.fees) || props.orderFlow.isSubmitting
  if (openSeaAsset.isLoading) return <NftFlyoutLoader close={props.close} />
  if (openSeaAsset.error)
    return <NftFlyoutFailure error={openSeaAsset.error || ''} close={props.close} />

  const asset = openSeaAsset.data

  if (!asset) return <NftFlyoutFailure error='Error fetching asset data.' close={props.close} />

  return (
    <>
      <FlyoutHeader sticky data-e2e='cancelListing' mode='back' onClick={() => close()}>
        <FormattedMessage id='copy.cancel_listing' defaultMessage='Cancel Listing' />
      </FlyoutHeader>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <NftAssetHeaderRow asset={asset} />
        <NftFlyoutRow>
          <Flex alignItems='center' justifyContent='space-between'>
            <Text color='black' weight={600} size='20px'>
              <FormattedMessage id='copy.price' defaultMessage='Price' />
            </Text>
            <Flex flexDirection='column' alignItems='flex-end' gap={4}>
              <CoinDisplay size='14px' color='black' weight={600} coin='ETH'>
                {seaportOrder?.current_price}
              </CoinDisplay>
              <FiatDisplay size='12px' color='grey600' weight={600} coin='ETH'>
                {seaportOrder?.current_price}
              </FiatDisplay>
            </Flex>
          </Flex>
        </NftFlyoutRow>
      </div>
      <StickyCTA>
        <CancelListingFees {...props} asset={asset} />
        <br />
        {isInvited ? (
          orderFlow.fees.cata({
            Failure: () => (
              <Text size='14px' weight={600}>
                <FormattedMessage
                  id='copy.no_active_listings'
                  defaultMessage='Error. You may not have any active listings for this asset.'
                />
              </Text>
            ),
            Loading: () => null,
            NotAsked: () => null,
            Success: (val) =>
              listingToCancel ? (
                <Button
                  jumbo
                  nature='primary'
                  fullwidth
                  data-e2e='cancelListingNft'
                  disabled={disabled}
                  onClick={() => {
                    cancelListingClicked()
                    nftActions.cancelListing({ asset, gasData: val, order: listingToCancel })
                  }}
                >
                  {props.orderFlow.isSubmitting ? (
                    <HeartbeatLoader color='blue100' height='20px' width='20px' />
                  ) : (
                    <FormattedMessage id='copy.cancel_listing' defaultMessage='Cancel Listing' />
                  )}
                </Button>
              ) : (
                <Text size='14px' weight={600}>
                  <FormattedMessage
                    id='copy.no_active_listings'
                    defaultMessage='Error. You may not have any active listings for this asset.'
                  />
                </Text>
              )
          })
        ) : (
          <Link href='https://www.blockchain.com/waitlist/nft' target='_blank'>
            <Button jumbo nature='primary' fullwidth data-e2e='joinWaitlist'>
              <FormattedMessage id='copy.join_waitlist' defaultMessage='Join the Waitlist' />
            </Button>
          </Link>
        )}
      </StickyCTA>
    </>
  )
}

type Props = OwnProps

export default CancelListing
