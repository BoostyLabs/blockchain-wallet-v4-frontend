export const getPassword = async (): Promise<string> => {
  const { password } = await chrome.storage.session.get('password')
  return password
}

export const savePassword = async (password: string): Promise<void> => {
  await chrome.storage.session.set({ password })
}

export const setSessionExpireTime = async (): Promise<void> => {
  const sessionExpiresAt = new Date()
  sessionExpiresAt.setHours(sessionExpiresAt.getHours() + 2)
  await chrome.storage.local.set({ sessionExpiresAt })
}

export const isSessionActive = async (): Promise<boolean> => {
  const { sessionExpiresAt } = await chrome.storage.local.get('sessionExpiresAt')
  return sessionExpiresAt > new Date()
}

export const saveSessionPayload = async (sessionPayload: any): Promise<void> => {
  await chrome.storage.session.set({ sessionPayload })
}
