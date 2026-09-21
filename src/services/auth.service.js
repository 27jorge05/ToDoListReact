import {
  API_URL_LOGIN,
  API_URL_USER,
} from './service'
import { apiFetch } from './http.service'

async function getLoginErrorMessage(response) {
  try {
    const errorData = await response.json()

    return (
      errorData.errors?.email?.[0] ??
      errorData.errors?.password?.[0] ??
      errorData.errors?.deviceName?.[0] ??
      errorData.message ??
      `Error al iniciar sesión: ${response.status}`
    )
  } catch {
    return `Error al iniciar sesión: ${response.status}`
  }
}

export async function loginUser(credentials) {
  const response = await fetch(API_URL_LOGIN, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })

  if (!response.ok) {
    const message = await getLoginErrorMessage(response)
    throw new Error(message)
  }

  return response.json()
}
export async function getCurrentUser() {
  const response = await apiFetch(
    API_URL_USER,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    },
  )

  if (!response.ok) {
    throw new Error(
      `No fue posible verificar la sesión: ${response.status}`,
    )
  }

  return response.json()
}