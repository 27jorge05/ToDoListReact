import { API_URL_CATEGORIES } from "./service";

export async function getAllCategories() {
    const response = await fetch(API_URL_CATEGORIES, {
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