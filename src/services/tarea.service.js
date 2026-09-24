import { API_URL_TASKS } from './service'
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

function normalizeTask(task) {
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    categoryId: task.category?.id ?? null,
    category: task.category ?? null,
    tags: task.tags ?? [],
    isCompleted: task.status === 'completed',
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
  }
}

function buildTaskPayload(taskData) {
  return {
    title: taskData.title,
    description: taskData.description,
    status: taskData.isCompleted ? 'completed' : 'pending',
    categoryId: taskData.categoryId ?? null,
    tagIds: taskData.tagIds ?? [],
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
    throw new Error(
      await getErrorMessage(
        response,
        `Error al obtener tareas: ${response.status}`,
      ),
    )
  }

  const json = await response.json()

  return {
    data: (json.data?.tasks ?? []).map(normalizeTask),
    meta: null,
  }
}

export async function createTask(taskData) {
  const response = await apiFetch(API_URL_TASKS, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(buildTaskPayload(taskData)),
  })

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(
        response,
        `Error al crear la tarea: ${response.status}`,
      ),
    )
  }

  const json = await response.json()

  return { data: json.data?.task ? normalizeTask(json.data.task) : null }
}

export async function updateTask(taskId, taskData) {
  const response = await apiFetch(
    `${API_URL_TASKS}/${taskId}`,
    {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(buildTaskPayload(taskData)),
    },
  )

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(
        response,
        `Error al actualizar la tarea: ${response.status}`,
      ),
    )
  }

  const json = await response.json()

  return { data: json.data?.task ? normalizeTask(json.data.task) : null }
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
    throw new Error(
      await getErrorMessage(
        response,
        `Error al obtener la tarea: ${response.status}`,
      ),
    )
  }

  const json = await response.json()

  return { data: json.data?.task ? normalizeTask(json.data.task) : null }
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
    throw new Error(
      await getErrorMessage(
        response,
        `Error al eliminar la tarea: ${response.status}`,
      ),
    )
  }
}