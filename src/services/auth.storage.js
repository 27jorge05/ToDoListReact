const AUTH_TOKEN_KEY = 'authToken'
const AUTH_USER_KEY = 'authUser'

export function saveAuthToken(token) {
  localStorage.setItem(AUTH_TOKEN_KEY, token)
}

export function getAuthToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY)
}

export function removeAuthToken() {
  localStorage.removeItem(AUTH_TOKEN_KEY)
}

export function saveAuthUser(user) {
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user))
}

export function getAuthUser() {
  const raw = localStorage.getItem(AUTH_USER_KEY)

  if (!raw) {
    return null
  }

  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function removeAuthUser() {
  localStorage.removeItem(AUTH_USER_KEY)
}