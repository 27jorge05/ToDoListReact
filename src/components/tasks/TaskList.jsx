import { useEffect, useState } from 'react'
import {
    getAllTasks,
    getOneTask,
    deleteTask,
} from '../../services/tarea.service'
import '../../styles/resource.css'
import TaskFormDialog from './TaskFormDialog'
import TaskDetailDialog from './TaskDetailDialog'
import TaskDeleteDialog from './TaskDeleteDialog'

function TaskList({
    selectedCategory,
    onClearCategory,
}) {
    const [tasks, setTasks] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [taskToEdit, setTaskToEdit] = useState(null)
    const [error, setError] = useState('')
    const [selectedTaskId, setSelectedTaskId] = useState(null)
    const [taskDetail, setTaskDetail] = useState(null)
    const [isDetailLoading, setIsDetailLoading] = useState(false)
    const [detailError, setDetailError] = useState('')
    const [taskToDelete, setTaskToDelete] = useState(null)
    const [isDeleting, setIsDeleting] = useState(false)
    const [deleteError, setDeleteError] = useState('')

    async function loadTasks() {
        try {
            setIsLoading(true)
            setError('')

            const response = await getAllTasks()
            setTasks(response.data ?? [])
        } catch (loadError) {
            setError(loadError.message)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        loadTasks()
    }, [])

    async function handleSaved() {
        setIsFormOpen(false)
        setTaskToEdit(null)
        await loadTasks()
    }

    function handleCreateClick() {
        setTaskToEdit(null)
        setIsFormOpen(true)
    }

    function handleEditClick(task) {
        setTaskToEdit(task)
        setIsFormOpen(true)
    }

    function handleCloseForm() {
        setIsFormOpen(false)
        setTaskToEdit(null)
    }
    async function handleDetailClick(taskId) {
        try {
            setSelectedTaskId(taskId)
            setTaskDetail(null)
            setDetailError('')
            setIsDetailLoading(true)

            const response = await getOneTask(taskId)
            setTaskDetail(response.data)
        } catch (showError) {
            setDetailError(showError.message)
        } finally {
            setIsDetailLoading(false)
        }
    }

    function handleCloseDetail() {
        setSelectedTaskId(null)
        setTaskDetail(null)
        setDetailError('')
    }
    function handleDeleteClick(task) {
        setTaskToDelete(task)
        setDeleteError('')
    }

    function handleCancelDelete() {
        if (!isDeleting) {
            setTaskToDelete(null)
            setDeleteError('')
        }
    }

    async function handleConfirmDelete(taskId) {
        try {
            setIsDeleting(true)
            setDeleteError('')

            await deleteTask(taskId)

            setTasks((currentTasks) =>
                currentTasks.filter(
                    (task) => task.id !== taskId,
                ),
            )

            setTaskToDelete(null)
        } catch (deleteTaskError) {
            setDeleteError(deleteTaskError.message)
        } finally {
            setIsDeleting(false)
        }
    }
    const visibleTasks = selectedCategory
        ? tasks.filter(
            (task) => task.categoryId === selectedCategory.id,
        )
        : tasks

    return (
        <section className="categoriesPage">
            <header className="taskPageHeader">
                <div>
                    <p className="detailDialogEyebrow">Organización</p>
                    <h2>Tareas</h2>
                    <p>
                        Registra las actividades que necesitas completar.
                    </p>
                </div>

                <button
                    type="button"
                    className="primaryButton"
                    onClick={handleCreateClick}
                >
                    Nueva tarea
                </button>
            </header>

            {selectedCategory && (
                <div className="activeCategoryFilter">
                    <span>
                        Mostrando tareas de:
                        <strong>{selectedCategory.name}</strong>
                    </span>

                    <button
                        type="button"
                        className="secondaryButton"
                        onClick={onClearCategory}
                    >
                        Mostrar todas
                    </button>
                </div>
            )}

            <div className="categoryCard">
                <h3>Tareas registradas</h3>

                {error && (
                    <p className="feedbackMessage errorMessage">{error}</p>
                )}

                {isLoading ? (
                    <p className="emptyMessage">
                        Cargando tareas...
                    </p>
                ) : visibleTasks.length === 0 ? (
                    <p className="emptyMessage">
                        {selectedCategory
                            ? `No existen tareas en ${selectedCategory.name}.`
                            : 'Todavía no existen tareas registradas.'}
                    </p>
                ) : (
                    <div className="categoryTableWrapper">
                        <table className="categoryTable">
                            <thead>
                                <tr>
                                    <th>Tarea</th>
                                    <th>Categoría</th>
                                    <th>Etiquetas</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>

                            <tbody>
                                {visibleTasks.map((task) => (
                                    <tr key={task.id}>
                                        <td>
                                            <strong>{task.title}</strong>

                                            {task.description && (
                                                <p className="taskTableDescription">
                                                    {task.description}
                                                </p>
                                            )}
                                        </td>

                                        <td>
                                            {task.category?.name ?? 'Sin categoría'}
                                        </td>

                                        <td>
                                            <div className="taskTags">
                                                {task.tags?.length > 0 ? (
                                                    task.tags.map((tag) => (
                                                        <span
                                                            className="taskTag"
                                                            key={tag.id}
                                                            style={{ '--task-tag-color': tag.color }}
                                                        >
                                                            {tag.name}
                                                        </span>
                                                    ))
                                                ) : (
                                                    'Sin etiquetas'
                                                )}
                                            </div>
                                        </td>

                                        <td>
                                            <span
                                                className={
                                                    task.isCompleted
                                                        ? 'taskStatus taskStatusCompleted'
                                                        : 'taskStatus taskStatusPending'
                                                }
                                            >
                                                {task.isCompleted
                                                    ? 'Completada'
                                                    : 'Pendiente'}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="tableActions">
                                                <button
                                                    type="button"
                                                    className="viewButton"
                                                    onClick={() => handleDetailClick(task.id)}
                                                >
                                                    Ver detalle
                                                </button>

                                                <button
                                                    type="button"
                                                    className="editButton"
                                                    onClick={() => handleEditClick(task)}
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    type="button"
                                                    className="deleteButton"
                                                    onClick={() => handleDeleteClick(task)}
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>

                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            <TaskFormDialog
                isOpen={isFormOpen}
                taskToEdit={taskToEdit}
                onSaved={handleSaved}
                onClose={handleCloseForm}
            />
            <TaskDetailDialog
                isOpen={selectedTaskId !== null}
                task={taskDetail}
                isLoading={isDetailLoading}
                error={detailError}
                onClose={handleCloseDetail}
            />
            <TaskDeleteDialog
                task={taskToDelete}
                isDeleting={isDeleting}
                error={deleteError}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        </section>

    )
}

export default TaskList
