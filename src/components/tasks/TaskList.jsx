import { useEffect, useState } from 'react'
import { getAllTasks } from '../../services/tarea.service'
import '../../styles/resource.css'
import TaskFormDialog from './TaskFormDialog'

function TaskList({
    selectedCategory,
    onClearCategory,
}) {
    const [tasks, setTasks] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [taskToEdit, setTaskToEdit] = useState(null)
    const [error, setError] = useState('')

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
                                            <button
                                                type="button"
                                                className="editButton"
                                                onClick={() => handleEditClick(task)}
                                            >
                                                Editar
                                            </button>
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
        </section>
    )
}

export default TaskList
