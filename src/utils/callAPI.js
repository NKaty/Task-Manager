import APIError from './APIError'

export default async (endPoint, config = null) => {
  let response
  let json

  try {
    response = await fetch(`${endPoint}`, config)
  } catch (error) {
    throw new APIError(error.message)
  }

  if (!response.ok) {
    throw new APIError(response.statusText)
  }

  try {
    json = await response.json()
  } catch (error) {
    throw new APIError(error.message || 'Something bad happened')
  }

  if (json.status === 'error') {
    console.log(json.message)
    throw new APIError(json.message)
  }

  return json
}
