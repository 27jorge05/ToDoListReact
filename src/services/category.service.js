import { API_URL_CATEGORIES } from "./service";
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

export async function getAllCategories() {
  const response = await apiFetch(
    API_URL_CATEGORIES,
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
        `Error al obtener categorías: ${response.status}`,
      ),
    )
  }

  const json = await response.json()

  return {
    data: json.data?.categories ?? [],
    meta: null,
  }
}

export async function createCategory(categoryData) {
    const response = await apiFetch(API_URL_CATEGORIES, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryData),
    })

    if (!response.ok) {
        throw new Error(
            await getErrorMessage(
                response,
                `Error al crear la categoría: ${response.status}`,
            ),
        )
    }

    const json = await response.json()

    return { data: json.data?.category }
}
export async function updateCategory(categoryId, categoryData) {
    const response = await apiFetch(
        `${API_URL_CATEGORIES}/${categoryId}`,
        {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(categoryData),
        },
    )

    if (!response.ok) {
        throw new Error(
            await getErrorMessage(
                response,
                `Error al actualizar la categoría: ${response.status}`,
            ),
        )
    }

    const json = await response.json()

    return { data: json.data?.category }
}

export async function deleteCategory(categoryId) {
    const response = await apiFetch(
        `${API_URL_CATEGORIES}/${categoryId}`,
        {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
            },
        },
    )

    if (!response.ok) {
        throw new Error(
            await getErrorMessage(
                response,
                `Error al eliminar la categoría: ${response.status}`,
            ),
        )
    }
}
export async function getOneCategory(categoryId) {
    const response = await apiFetch(
        `${API_URL_CATEGORIES}/${categoryId}`,
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
                `Error al obtener la categoría: ${response.status}`,
            ),
        )
    }

    const json = await response.json()

    return { data: json.data?.category }
}