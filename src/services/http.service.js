import {
    AUTH_UNAUTHORIZED_EVENT,
} from './auth.events'
import {
    getAuthToken,
    removeAuthToken,
} from './auth.storage'

export async function apiFetch(
    url,
    options = {},
) {
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

    const response = await fetch(url, {
        ...options,
        headers,
    })

    if (response.status === 401) {
        removeAuthToken()

        window.dispatchEvent(
            new Event(AUTH_UNAUTHORIZED_EVENT),
        )
    }

    return response
}