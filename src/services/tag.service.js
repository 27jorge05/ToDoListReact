import { API_URL_TAGS } from './service'
import { apiFetch } from './http.service'

async function getErrorMessage(response, fallbackMessage) {
  try {
    const errorData = await response.json()

    return (
      errorData.error?.message ??
      errorData.message ??
      fallbackMessage
    )
  } catch {
    return fallbackMessage
  }
}

function buildTagPayload(tagData) {
  return { name: tagData.name }
}

export async function getAllTags() {
  const response = await apiFetch(
    API_URL_TAGS,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    },
  )

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(
        response,
        `Error al obtener etiquetas: ${response.status}`,
      ),
    )
  }

  const json = await response.json()

  return {
    data: json.data?.tags ?? [],
    meta: null,
  }
}

export async function getOneTag(id) {
  const response = await apiFetch(`${API_URL_TAGS}/${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(
        response,
        `Error al obtener la etiqueta: ${response.status}`,
      ),
    )
  }

  const json = await response.json()

  return { data: json.data?.tag }
}

export async function createTag(tagData) {
  const response = await apiFetch(API_URL_TAGS, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(buildTagPayload(tagData)),
  })

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(
        response,
        `Error al crear la etiqueta: ${response.status}`,
      ),
    )
  }

  const json = await response.json()

  return { data: json.data?.tag }
}

export async function updateTag(id, tagData) {
  const response = await apiFetch(`${API_URL_TAGS}/${id}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(buildTagPayload(tagData)),
  })

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(
        response,
        `Error al actualizar la etiqueta: ${response.status}`,
      ),
    )
  }

  const json = await response.json()

  return { data: json.data?.tag }
}

export async function deleteTag(id) {
  const response = await apiFetch(`${API_URL_TAGS}/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(
        response,
        `Error al eliminar la etiqueta: ${response.status}`,
      ),
    )
  }
}