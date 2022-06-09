import React from 'react'

const IconEthereum = ({ color = '#000', size = 24 }: { color?: string; size?: number }) => {
  return (
    <svg
      width={size}
      height={size}
      fill={color}
      viewBox='0 0 32 32'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z'
        fill='#473BCB'
      />
      <path d='M15.9996 6V13.3932L22.2484 16.1855L15.9996 6Z' fill='white' />
      <path d='M15.9996 6L9.75 16.1855L15.9996 13.3932V6Z' fill='white' />
      <path d='M15.9996 20.9764V26L22.2526 17.349L15.9996 20.9764Z' fill='white' />
      <path d='M15.9996 26V20.9764L9.75 17.349L15.9996 26Z' fill='white' />
      <path d='M15.9996 19.8137L22.2484 16.1855L15.9996 13.3949V19.8137Z' fill='white' />
      <path d='M9.75 16.1855L15.9996 19.8137V13.3949L9.75 16.1855Z' fill='white' />
    </svg>
  )
}

export default IconEthereum
