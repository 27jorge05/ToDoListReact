import { API_URL_TAGS } from './service'
import { apiFetch } from './http.service'

async function getErrorMessage(response, fallbackMessage) {
  try {
    const errorData = await response.json()

    return (
      errorData.errors?.name?.[0] ??
      errorData.errors?.color?.[0] ??
      errorData.message ??
      fallbackMessage
    )
  } catch {
    return fallbackMessage
  }
}


export async function getAllTags() {
  const response = await apiFetch(API_URL_TAGS, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      `Error al obtener etiquetas: ${response.status}`,
    )

    throw new Error(message)
  }

  return response.json()
}

export async function getOneTag(id) {
  const response = await apiFetch(`${API_URL_TAGS}/${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      `Error al obtener la etiqueta: ${response.status}`,
    )

    throw new Error(message)
  }

  return response.json()
}

export async function createTag(tagData) {
  const response = await apiFetch(API_URL_TAGS, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tagData),
  })

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      `Error al crear la etiqueta: ${response.status}`,
    )

    throw new Error(message)
  }

  return response.json()
}

export async function updateTag(id, tagData) {
  const response = await apiFetch(`${API_URL_TAGS}/${id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tagData),
  })

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      `Error al actualizar la etiqueta: ${response.status}`,
    )

    throw new Error(message)
  }

  return response.json()
}

export async function deleteTag(id) {
  const response = await apiFetch(`${API_URL_TAGS}/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      `Error al eliminar la etiqueta: ${response.status}`,
    )

    throw new Error(message)
  }
}
