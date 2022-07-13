import React from 'react'
import { NavLink } from 'react-router-dom'
import { Icon } from '@blockchain-com/constellation'
import { IconHistory, IconListBullets, IconNft } from '@blockchain-com/icons'
import styled from 'styled-components'

const HomeNavbarItem = styled(NavLink)`
  display: block;
  position: relative;
  padding: 10px;
  font-size: 24px;
  color: #fff;

  & * {
    fill: ${(p) => p.theme.white};
  }

  &:not(:first-child),
  &:not(:last-child) {
    margin: 0 10px;
  }

  transition: 0.3s ease-in;

  &:after {
    content: '';
    height: 5px;
    width: 5px;
    background: transparent;
    transition: 0.3s ease-in;
    border-radius: 50%;
    position: absolute;
    bottom: 0;
    left: calc(50% - 2.5px);
  }

  &.active {
    margin-top: -3px;
  }

  &.active:after {
    background: ${(p) => p.theme.white};
  }
`

const HomeNavbarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const HomeNavbar = () => (
  <HomeNavbarWrapper>
    <HomeNavbarItem exact to='/plugin/coinslist'>
      <Icon label='icon-listbullets'>
        <IconListBullets />
      </Icon>
    </HomeNavbarItem>
    <HomeNavbarItem to='/plugin/activity'>
      <Icon label='icon-history'>
        <IconHistory color='white' />
      </Icon>
    </HomeNavbarItem>
    <HomeNavbarItem to='/plugin/nft'>
      <Icon label='icon-nft'>
        <IconNft />
      </Icon>
    </HomeNavbarItem>
  </HomeNavbarWrapper>
)

export default HomeNavbar
