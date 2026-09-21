import { useEffect, useState } from 'react'
import { getAllCategories } from '../../services/category.service'
import { getAllTags } from '../../services/tag.service'
import {
    createTask,
    updateTask,
} from '../../services/tarea.service'

function TaskForm({
    taskToEdit,
    onSaved,
    onCancel,
}) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [tagIds, setTagIds] = useState([])
    const [isCompleted, setIsCompleted] = useState(false)
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])
    const [isLoadingCatalogs, setIsLoadingCatalogs] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [error, setError] = useState('')

    const isEditing = Boolean(taskToEdit)

    useEffect(() => {
        async function loadCatalogs() {
            try {
                setIsLoadingCatalogs(true)
                setError('')

                const [categoriesResponse, tagsResponse] =
                    await Promise.all([
                        getAllCategories(),
                        getAllTags(),
                    ])

                setCategories(categoriesResponse.data ?? [])
                setTags(tagsResponse.data ?? [])
            } catch (loadError) {
                setError(loadError.message)
            } finally {
                setIsLoadingCatalogs(false)
            }
        }

        loadCatalogs()
    }, [])

    useEffect(() => {
        if (taskToEdit) {
            setTitle(taskToEdit.title)
            setDescription(taskToEdit.description ?? '')
            setCategoryId(String(taskToEdit.categoryId))
            setTagIds(
                taskToEdit.tags?.map((tag) => tag.id) ?? [],
            )
            setIsCompleted(taskToEdit.isCompleted)
        } else {
            setTitle('')
            setDescription('')
            setCategoryId('')
            setTagIds([])
            setIsCompleted(false)
        }

        setError('')
    }, [taskToEdit])

    function handleTagChange(event) {
        const selectedTagIds = Array.from(
            event.target.selectedOptions,
            (option) => Number(option.value),
        )

        setTagIds(selectedTagIds)
    }

    async function handleSubmit(event) {
        event.preventDefault()

        const trimmedTitle = title.trim()
        const trimmedDescription = description.trim()

        if (!trimmedTitle) {
            setError('El título de la tarea es obligatorio.')
            return
        }

        if (!categoryId) {
            setError('Debes seleccionar una categoría.')
            return
        }

        const taskData = {
            categoryId: Number(categoryId),
            title: trimmedTitle,
            description: trimmedDescription || null,
            isCompleted,
            tagIds,
        }

        try {
            setIsSaving(true)
            setError('')

            if (isEditing) {
                await updateTask(taskToEdit.id, taskData)
            } else {
                await createTask(taskData)
            }

            await onSaved()
        } catch (submitError) {
            setError(submitError.message)
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <form className="taskForm" onSubmit={handleSubmit}>
            <div className="taskFormHeader">
                <div>
                    <p className="detailDialogEyebrow">
                        {isEditing ? 'Modificar tarea' : 'Nueva tarea'}
                    </p>

                    <h2>
                        {isEditing ? 'Editar tarea' : 'Crear una tarea'}
                    </h2>
                </div>

                <button
                    type="button"
                    className="dialogCloseButton"
                    onClick={onCancel}
                    aria-label="Cerrar formulario"
                >
                    ×
                </button>
            </div>

            {isLoadingCatalogs ? (
                <p className="emptyMessage">
                    Cargando categorías y etiquetas...
                </p>
            ) : (
                <>
                    <div className="formField">
                        <label
                            className="formLabel"
                            htmlFor="taskTitle"
                        >
                            Título
                        </label>

                        <input
                            className="formInput"
                            id="taskTitle"
                            type="text"
                            value={title}
                            onChange={(event) =>
                                setTitle(event.target.value)
                            }
                            maxLength="255"
                            placeholder="Ejemplo: Estudiar React"
                            required
                        />
                    </div>

                    <div className="formField">
                        <label
                            className="formLabel"
                            htmlFor="taskDescription"
                        >
                            Descripción
                        </label>

                        <textarea
                            className="formInput taskDescription"
                            id="taskDescription"
                            value={description}
                            onChange={(event) =>
                                setDescription(event.target.value)
                            }
                            placeholder="Describe qué debes realizar"
                            rows="4"
                        />
                    </div>

                    <div className="formField">
                        <label
                            className="formLabel"
                            htmlFor="taskCategory"
                        >
                            Categoría
                        </label>

                        <select
                            className="formInput"
                            id="taskCategory"
                            value={categoryId}
                            onChange={(event) =>
                                setCategoryId(event.target.value)
                            }
                            required
                        >
                            <option value="">
                                Selecciona una categoría
                            </option>

                            {categories.map((category) => (
                                <option
                                    key={category.id}
                                    value={category.id}
                                >
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="formField">
                        <label
                            className="formLabel"
                            htmlFor="taskTags"
                        >
                            Etiquetas
                        </label>

                        <select
                            className="formInput taskTagSelect"
                            id="taskTags"
                            multiple
                            value={tagIds.map(String)}
                            onChange={handleTagChange}
                        >
                            {tags.map((tag) => (
                                <option key={tag.id} value={tag.id}>
                                    {tag.name}
                                </option>
                            ))}
                        </select>

                        <small className="fieldHelp">
                            Mantén Ctrl presionado para seleccionar varias.
                        </small>
                    </div>

                    {isEditing && (
                        <label className="checkboxField">
                            <input
                                type="checkbox"
                                checked={isCompleted}
                                onChange={(event) =>
                                    setIsCompleted(event.target.checked)
                                }
                            />

                            <span>Marcar como completada</span>
                        </label>
                    )}

                    {categories.length === 0 && (
                        <p className="feedbackMessage errorMessage">
                            Necesitas crear al menos una categoría.
                        </p>
                    )}

                    {error && (
                        <p
                            className="feedbackMessage errorMessage"
                            role="alert"
                        >
                            {error}
                        </p>
                    )}

                    <div className="formActions">
                        <button
                            type="submit"
                            className="primaryButton"
                            disabled={
                                isSaving || categories.length === 0
                            }
                        >
                            {isSaving
                                ? 'Guardando...'
                                : isEditing
                                    ? 'Guardar cambios'
                                    : 'Crear tarea'}
                        </button>

                        <button
                            type="button"
                            className="secondaryButton"
                            disabled={isSaving}
                            onClick={onCancel}
                        >
                            Cancelar
                        </button>
                    </div>
                </>
            )}
        </form>
    )
}

export default TaskForm