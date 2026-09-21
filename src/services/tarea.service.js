import { API_URL_TASKS } from './service'
import { apiFetch } from './http.service'

async function getErrorMessage(response, fallbackMessage) {
  try {
    const errorData = await response.json()

    return (
      errorData.errors?.categoryId?.[0] ??
      errorData.errors?.title?.[0] ??
      errorData.errors?.description?.[0] ??
      errorData.errors?.tagIds?.[0] ??
      errorData.message ??
      fallbackMessage
    )
  } catch {
    return fallbackMessage
  }
}

export async function getAllTasks() {
  const response = await apiFetch(API_URL_TASKS, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      `Error al obtener tareas: ${response.status}`,
    )

    throw new Error(message)
  }

  return response.json()
}

export async function createTask(taskData) {
  const response = await apiFetch(API_URL_TASKS, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskData),
  })

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      `Error al crear la tarea: ${response.status}`,
    )

    throw new Error(message)
  }

  return response.json()
}

export async function updateTask(taskId, taskData) {
  const response = await apiFetch(
    `${API_URL_TASKS}/${taskId}`,
    {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    },
  )

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      `Error al actualizar la tarea: ${response.status}`,
    )

    throw new Error(message)
  }

  return response.json()
}

export async function getOneTask(taskId) {
  const response = await apiFetch(
    `${API_URL_TASKS}/${taskId}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    },
  )

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      `Error al obtener la tarea: ${response.status}`,
    )

    throw new Error(message)
  }

  return response.json()
}

export async function deleteTask(taskId) {
  const response = await apiFetch(
    `${API_URL_TASKS}/${taskId}`,
    {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
      },
    },
  )

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      `Error al eliminar la tarea: ${response.status}`,
    )

    throw new Error(message)
  }
}