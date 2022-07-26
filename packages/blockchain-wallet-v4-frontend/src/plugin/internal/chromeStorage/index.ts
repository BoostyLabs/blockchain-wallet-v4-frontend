import { fromJS, Wrapper } from '@core/types/Wrapper'

export const setSessionExpireTime = async (): Promise<void> => {
  let sessionExpiresAt: string | Date = new Date()
  sessionExpiresAt.setHours(sessionExpiresAt.getHours() + 2)
  sessionExpiresAt = sessionExpiresAt.toString()
  await chrome.storage.local.set({ sessionExpiresAt })
}

export const getSessionPayload = async (): Promise<Wrapper | null> => {
  const { sessionPayload } = await chrome.storage.session.get('sessionPayload')
  if (!sessionPayload) return null
  console.log(sessionPayload);
  

  return fromJS(sessionPayload)
}

export const isSessionActive = async (): Promise<boolean> => {
  const { sessionExpiresAt } = await chrome.storage.local.get('sessionExpiresAt')
  return sessionExpiresAt ? new Date(sessionExpiresAt) > new Date() : false
}

export const saveSessionPayload = async (sessionPayload: Wrapper): Promise<void> => {
  await chrome.storage.session.set({ sessionPayload: sessionPayload.toJS() })
}

export const clearSession = async (): Promise<void> => {
  await chrome.storage.session.clear()
}
