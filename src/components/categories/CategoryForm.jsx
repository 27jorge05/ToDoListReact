import { useState } from 'react'
import { create } from '../../services/category.service'

function CategoryForm({ onCategoryCreated }) {
  const [name, setName] = useState('')
  const [error, setError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

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

      const response = await create({
        name: normalizedName,
      })

      onCategoryCreated(response.data)
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
        <h3>Crear categoría</h3>

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

        <button
          className="primaryButton"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Guardando...' : 'Crear categoría'}
        </button>

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