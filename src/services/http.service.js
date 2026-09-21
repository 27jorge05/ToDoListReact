import { getAuthToken } from './auth.storage'

export function apiFetch(url, options = {}) {
  const headers = new Headers(options.headers ?? {})
  const token = getAuthToken()

  if (!headers.has('Accept')) {
    headers.set('Accept', 'application/json')
  }

  if (token) {
    headers.set(
      'Authorization',
      `Bearer ${token}`,
    )
  }

  return fetch(url, {
    ...options,
    headers,
  })
}