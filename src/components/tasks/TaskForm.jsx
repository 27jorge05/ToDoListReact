import { useEffect, useState } from 'react'
import { getAllCategories } from '../../services/category.service'
import { getAllTags } from '../../services/tag.service'
import { createTask } from '../../services/tarea.service'

function TaskForm({ onCreated, onCancel }) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [tagIds, setTagIds] = useState([])
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])
    const [isLoadingCatalogs, setIsLoadingCatalogs] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        async function loadCatalogs() {
            try {
                setIsLoadingCatalogs(true)
                setError('')

                const [categoriesResponse, tagsResponse] = await Promise.all([
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
            isCompleted: false,
            tagIds,
        }

        try {
            setIsSaving(true)
            setError('')

            await createTask(taskData)
            await onCreated()
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
                    <p className="detailDialogEyebrow">Nueva tarea</p>
                    <h2>Crear una tarea</h2>
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
                <p className="emptyMessage">Cargando categorías y etiquetas...</p>
            ) : (
                <>
                    <div className="formField">
                        <label className="formLabel" htmlFor="taskTitle">
                            Título
                        </label>

                        <input
                            className="formInput"
                            id="taskTitle"
                            type="text"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            maxLength="255"
                            placeholder="Ejemplo: Estudiar React"
                        />
                    </div>

                    <div className="formField">
                        <label className="formLabel" htmlFor="taskDescription">
                            Descripción
                        </label>

                        <textarea
                            className="formInput taskDescription"
                            id="taskDescription"
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                            placeholder="Describe qué debes realizar"
                            rows="4"
                        />
                    </div>

                    <div className="formField">
                        <label className="formLabel" htmlFor="taskCategory">
                            Categoría
                        </label>

                        <select
                            className="formInput"
                            id="taskCategory"
                            value={categoryId}
                            onChange={(event) => setCategoryId(event.target.value)}
                        >
                            <option value="">Selecciona una categoría</option>

                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="formField">
                        <label className="formLabel" htmlFor="taskTags">
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
                            Mantén Ctrl presionado para seleccionar varias etiquetas.
                        </small>
                    </div>

                    {categories.length === 0 && (
                        <p className="feedbackMessage errorMessage">
                            Necesitas crear al menos una categoría antes de crear tareas.
                        </p>
                    )}

                    {error && (
                        <p className="feedbackMessage errorMessage">{error}</p>
                    )}

                    <div className="formActions">
                        <button
                            type="submit"
                            className="primaryButton"
                            disabled={isSaving || categories.length === 0}
                        >
                            {isSaving ? 'Creando...' : 'Crear tarea'}
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
