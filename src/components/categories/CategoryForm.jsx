import { useEffect, useState } from 'react'
import {
  create,
  update,
} from '../../services/category.service'

function CategoryForm({
  categoryToEdit,
  onCategoryCreated,
  onCategoryUpdated,
  onCancelEdit,
}) {
  const [name, setName] = useState('')
  const [error, setError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isEditing = Boolean(categoryToEdit)

  useEffect(() => {
    setName(categoryToEdit?.name ?? '')
    setError(null)
  }, [categoryToEdit])

  async function handleSubmit(event) {
    event.preventDefault()

    const normalizedName = name.trim()

    if (!normalizedName) {
      setError('El nombre de la categoría es obligatorio.')
      return
    }

    try {
      setIsSubmitting(true)
      setError(null)

      if (isEditing) {
        const response = await update(
          categoryToEdit.id,
          {
            name: normalizedName,
          },
        )

        onCategoryUpdated(response.data)
      } else {
        const response = await create({
          name: normalizedName,
        })

        onCategoryCreated(response.data)
      }

      setName('')
    } catch (error) {
      setError(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleNameChange(event) {
    setName(event.target.value)
  }

  return (
    <article className="categoryCard">
      <form
        className="categoryForm"
        onSubmit={handleSubmit}
      >
        <h3>
          {isEditing
            ? 'Editar categoría'
            : 'Crear categoría'}
        </h3>

        <div className="formField">
          <label
            className="formLabel"
            htmlFor="categoryName"
          >
            Nombre
          </label>

          <input
            className="formInput"
            id="categoryName"
            name="name"
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Ejemplo: Trabajo"
            maxLength={100}
            required
          />
        </div>

        <div className="formActions">
          <button
            className="primaryButton"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? 'Guardando...'
              : isEditing
                ? 'Guardar cambios'
                : 'Crear categoría'}
          </button>

          {isEditing && (
            <button
              className="secondaryButton"
              type="button"
              onClick={onCancelEdit}
              disabled={isSubmitting}
            >
              Cancelar
            </button>
          )}
        </div>

        {error && (
          <p
            className="feedbackMessage errorMessage"
            role="alert"
          >
            {error}
          </p>
        )}
      </form>
    </article>
  )
}

export default CategoryForm