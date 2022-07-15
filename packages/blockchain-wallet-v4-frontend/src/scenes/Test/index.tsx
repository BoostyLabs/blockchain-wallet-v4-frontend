import React, { FC, useCallback, useEffect } from 'react'
import { addConnection } from 'plugin/internal'

type Props = {
  history: {
    location: {
      search: string
    }
  }
}

const Test: FC<Props> = (props: Props) => {
  useEffect(() => {
    window.onbeforeunload = () => {
      chrome.runtime.sendMessage({
        data: null,
        type: 'rejected'
      })
    }
  }, [])

  const onAccept = useCallback(async () => {
    try {
      const params = new URLSearchParams(props.history.location.search)
      const domain = params.get('domain') || ''
      await addConnection(domain)
      await chrome.runtime.sendMessage({
        data: 'random address',
        type: 'approved'
      })
      window.close()
    } catch (e) {
      // eslint-disable-next-line
      console.log(e)
    }
  }, [props.history.location.search])

  const onDecline = useCallback(async () => {
    try {
      await chrome.runtime.sendMessage({
        data: null,
        type: 'rejected'
      })
      window.close()
    } catch (e) {
      // eslint-disable-next-line
      console.log(e)
    }
  }, [])

  return (
    <div>
      <button
        style={{
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '30px',
          marginRight: '20px',
          padding: '20px'
        }}
        type='button'
        onClick={onDecline}
      >
        DECLINE
      </button>
      <button
        style={{ borderRadius: '8px', cursor: 'pointer', fontSize: '30px', padding: '20px' }}
        type='button'
        onClick={onAccept}
      >
        ACCEPT
      </button>
    </div>
  )
}

export default Test
