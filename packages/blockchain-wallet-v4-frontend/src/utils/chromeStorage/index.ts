export const getPassword = () => {
  if (chrome) {
    return chrome.storage.session.get('password')
  }
}

export const savePassword = (password: string) => {
  if (chrome) {
    return chrome.storage.session.set({ password })
  }
}
