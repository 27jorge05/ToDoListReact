import { useEffect, useState } from 'react'
import { getAllCategories } from '../../services/category.service'

function CategoryList() {
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadCategories() {
      try {
        const response = await getAllCategories()

        setCategories(response.data)
      } catch (error) {
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    loadCategories()
  }, [])

  if (isLoading) {
    return <p>Cargando categorías...</p>
  }

  if (error) {
    return <p role="alert">{error}</p>
  }

  return (
    <section>
      <h1>Categorías</h1>

      {categories.length === 0 ? (
        <p>No existen categorías registradas.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nombre</th>
              <th scope="col">Fecha de creación</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>
                  {new Date(category.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  )
}

export default CategoryList