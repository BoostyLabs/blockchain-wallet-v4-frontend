import { NabuErrorInNetworkResponseUtility } from './isNabuErrorInNetworkResponse.types'

const isNabuErrorInNetworkResponse: NabuErrorInNetworkResponseUtility = (payload) => {
  const hasUxAttribute = Object.prototype.hasOwnProperty.call(payload, 'ux')

  if (hasUxAttribute) {
    const { ux } = payload as { ux: object }

    const hasTitleInUx = Object.prototype.hasOwnProperty.call(ux, 'title')
    const hasMessageInUx = Object.prototype.hasOwnProperty.call(ux, 'message')

    return hasTitleInUx && hasMessageInUx
  }

  return false
}

export default isNabuErrorInNetworkResponse
