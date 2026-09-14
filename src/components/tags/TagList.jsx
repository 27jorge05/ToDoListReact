import { useEffect, useState } from 'react'
import { deleteTag, getAll, getOne } from '../../services/tag.service'
import '../../styles/resource.css'
import TagDeleteDialog from './TagDeleteDialog'
import TagDetailDialog from './TagDetailDialog'
import TagForm from './TagForm'

function TagList() {
    const [tags, setTags] = useState([])
    const [tagToEdit, setTagToEdit] = useState(null)
    const [tagToDelete, setTagToDelete] = useState(null)
    const [selectedTag, setSelectedTag] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isDeleting, setIsDeleting] = useState(false)
    const [error, setError] = useState('')

    async function loadTags() {
        try {
            setIsLoading(true)
            setError('')

            const response = await getAll()
            setTags(response.data ?? [])
        } catch (loadError) {
            setError(loadError.message)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        loadTags()
    }, [])

    async function handleShow(id) {
        try {
            setError('')

            const response = await getOne(id)
            setSelectedTag(response.data)
        } catch (showError) {
            setError(showError.message)
        }
    }

    async function handleDelete(id) {
        try {
            setIsDeleting(true)
            setError('')

            await deleteTag(id)
            setTagToDelete(null)
            await loadTags()
        } catch (deleteError) {
            setError(deleteError.message)
        } finally {
            setIsDeleting(false)
        }
    }

    async function handleSaved() {
        setTagToEdit(null)
        await loadTags()
    }

    return (
        <section className="categoriesPage">
            <header className="resourceHeader">
                <div>
                    <p className="eyebrow">Administración</p>
                    <h1>Etiquetas</h1>
                    <p className="resourceDescription">
                        Organiza tus tareas utilizando nombres y colores.
                    </p>
                </div>
            </header>

            <div className="resourceLayout">
                <div className="categoryCard">
                    <TagForm
                        tagToEdit={tagToEdit}
                        onSaved={handleSaved}
                        onCancel={() => setTagToEdit(null)}
                    />
                </div>

                <div className="categoryCard tableCard">
                    <div className="tableHeader">
                        <h2>Etiquetas registradas</h2>
                        <span className="resourceCount">{tags.length}</span>
                    </div>

                    {error && <p className="errorMessage">{error}</p>}

                    {isLoading ? (
                        <p className="stateMessage">Cargando etiquetas...</p>
                    ) : tags.length === 0 ? (
                        <p className="stateMessage">
                            Todavía no existen etiquetas registradas.
                        </p>
                    ) : (
                        <div className="tableWrapper">
                            <table className="resourceTable">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Etiqueta</th>
                                        <th>Color</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {tags.map((tag) => (
                                        <tr key={tag.id}>
                                            <td>{tag.id}</td>

                                            <td>
                                                <span
                                                    className="tagBadge"
                                                    style={{
                                                        '--tag-color': tag.color ?? '#64748b',
                                                    }}
                                                >
                                                    {tag.name}
                                                </span>
                                            </td>

                                            <td>{tag.color ?? 'Sin color'}</td>

                                            <td>
                                                <div className="tableActions">
                                                    <button
                                                        type="button"
                                                        className="smallButton"
                                                        onClick={() => handleShow(tag.id)}
                                                    >
                                                        Ver
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="smallButton secondaryButton"
                                                        onClick={() => setTagToEdit(tag)}
                                                    >
                                                        Editar
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="smallButton dangerButton"
                                                        onClick={() => setTagToDelete(tag)}
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
            </div>

            <TagDetailDialog
                tag={selectedTag}
                onClose={() => setSelectedTag(null)}
            />

            <TagDeleteDialog
                tag={tagToDelete}
                isDeleting={isDeleting}
                onConfirm={handleDelete}
                onClose={() => setTagToDelete(null)}
            />
        </section>
    )
}

export default TagList