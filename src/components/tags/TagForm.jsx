import { useEffect, useState } from 'react'
import { createTag, updateTag } from '../../services/tag.service'

function TagForm({ tagToEdit, onSaved, onCancel }) {

    const [name, setName] = useState('')
    const [error, setError] = useState('')
    const [isSaving, setIsSaving] = useState(false)

    const isEditing = Boolean(tagToEdit)

    useEffect(() => {
        if (tagToEdit) {
            setName(tagToEdit.name)
        } else {
            setName('')
        }

        setError('')
    }, [tagToEdit])

    async function handleSubmit(event) {
        event.preventDefault()

        const trimmedName = name.trim()

        if (!trimmedName) {
            setError('El nombre de la etiqueta es obligatorio.')
            return
        }

        const tagData = {
            name: trimmedName,
        }

        try {
            setIsSaving(true)
            setError('')

            if (isEditing) {
                await updateTag(tagToEdit.id, tagData)
            } else {
                await createTag(tagData)
            }

            setName('')
            await onSaved()
        } catch (submitError) {
            setError(submitError.message)
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <form className="resourceForm" onSubmit={handleSubmit}>
            <h2>{isEditing ? 'Editar etiqueta' : 'Nueva etiqueta'}</h2>

            <label htmlFor="tagName">Nombre</label>
            <input
                id="tagName"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                maxLength="100"
                placeholder="Ejemplo: Importante"
            />

            {error && <p className="errorMessage">{error}</p>}

            <div className="formActions">
                <button type="submit" disabled={isSaving}>
                    {isSaving
                        ? 'Guardando...'
                        : isEditing
                            ? 'Actualizar'
                            : 'Crear etiqueta'}
                </button>

                {isEditing && (
                    <button type="button" className="secondaryButton" onClick={onCancel}>
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    )
}

export default TagForm
