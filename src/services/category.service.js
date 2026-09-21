import { API_URL_CATEGORIES } from "./service";
import { apiFetch } from './http.service'

export async function getAllCategories() {
    const response = await apiFetch(API_URL_CATEGORIES, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
    })
    if (!response.ok) {
        throw new Error(
            `Error al obtener categorías: ${response.status}`,
        )
    }



    return response.json()
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
        const errorData = await response.json()

        const errorMessage =
            errorData.errors?.name?.[0] ??
            errorData.message ??
            `Error al crear la categoría: ${response.status}`

        throw new Error(errorMessage)
    }

    return response.json()
}
export async function updateCategory(categoryId, categoryData) {
    const response = await apiFetch(
        `${API_URL_CATEGORIES}/${categoryId}`,
        {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(categoryData),
        },
    )

    if (!response.ok) {
        const errorData = await response.json()

        const errorMessage =
            errorData.errors?.name?.[0] ??
            errorData.message ??
            `Error al actualizar la categoría: ${response.status}`

        throw new Error(errorMessage)
    }

    return response.json()
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
        let errorMessage =
            `Error al eliminar la categoría: ${response.status}`

        try {
            const errorData = await response.json()

            errorMessage =
                errorData.message ?? errorMessage
        } catch {
            // La respuesta de error no contenía JSON.
        }

        throw new Error(errorMessage)
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
            `Error al obtener la categoría: ${response.status}`,
        )
    }

    return response.json()
}
