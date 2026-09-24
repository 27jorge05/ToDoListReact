import {
  API_URL_LOGIN,
  API_URL_REGISTER,
  API_URL_LOGOUT,
} from './service'
import { getAuthToken, getAuthUser } from './auth.storage'

async function getAuthErrorMessage(response, actionLabel) {
  try {
    const errorData = await response.json()

    return (
      errorData.error?.message ??
      errorData.message ??
      `${actionLabel}: ${response.status}`
    )
  } catch {
    return `${actionLabel}: ${response.status}`
  }
}

export async function registerUser(userData) {
  const response = await fetch(API_URL_REGISTER, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: userData.name,
      email: userData.email,
      password: userData.password,
    }),
  })

  if (!response.ok) {
    const message = await getAuthErrorMessage(
      response,
      'Error al registrarse',
    )
    throw new Error(message)
  }

  return response.json()
}

export async function loginUser(credentials) {
  const response = await fetch(API_URL_LOGIN, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: credentials.email,
      password: credentials.password,
    }),
  })

  if (!response.ok) {
    const message = await getAuthErrorMessage(
      response,
      'Error al iniciar sesión',
    )
    throw new Error(message)
  }

  return response.json()
}

export async function logout() {
  const token = getAuthToken()

  try {
    await fetch(API_URL_LOGOUT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
      },
    })
  } catch {
    // El logout es local: no cancelamos la sesión por un error de red.
  }
}

export async function getCurrentUser() {
  const user = getAuthUser()

  if (!user) {
    throw new Error('No hay una sesión activa.')
  }

  return { data: user }
}