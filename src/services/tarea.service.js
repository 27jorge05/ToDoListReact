
import { API_URL_TASKS } from './service'

export async function getAll() {
    const response = await fetch(API_URL_TASKS, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
    })

    if (!response.ok) {
        throw new Error(`Error al obtener tareas:${response.status}`)
    }
    return response.json()
}
