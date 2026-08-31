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
    <form onSubmit={handleSubmit}>
      <h2>Crear categoría</h2>

      <div>
        <label htmlFor="categoryName">
          Nombre
        </label>

        <input
          id="categoryName"
          name="name"
          type="text"
          value={name}
          onChange={handleNameChange}
          maxLength={100}
          required
        />
      </div>

      {error && (
        <p role="alert">
          {error}
        </p>
      )}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Guardando...' : 'Crear categoría'}
      </button>
    </form>
  )
}

export default CategoryForm