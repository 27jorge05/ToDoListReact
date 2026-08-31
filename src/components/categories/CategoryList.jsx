import { useEffect, useState } from 'react'
import { getAllCategories } from '../../services/category.service'
import CategoryForm from './CategoryForm'
import './CategoryList.css'

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

  function handleCategoryCreated(newCategory) {
    setCategories((currentCategories) => {
      const updatedCategories = [
        ...currentCategories,
        newCategory,
      ]

      return updatedCategories.sort((firstCategory, secondCategory) =>
        firstCategory.name.localeCompare(secondCategory.name),
      )
    })
  }

  if (isLoading) {
    return (
      <p className="categoryCard">
        Cargando categorías...
      </p>
    )
  }

  if (error) {
    return (
      <p
        className="feedbackMessage errorMessage"
        role="alert"
      >
        {error}
      </p>
    )
  }

  return (
    <section className="categoriesPage">
      <header className="categoriesHeader">
        <h2>Categorías</h2>
        <p>
          Organiza tus tareas mediante categorías.
        </p>
      </header>

      <CategoryForm
        onCategoryCreated={handleCategoryCreated}
      />

      <article className="categoryCard">
        {categories.length === 0 ? (
          <p className="emptyMessage">
            No existen categorías registradas.
          </p>
        ) : (
          <div className="categoryTableWrapper">
            <table className="categoryTable">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Creada</th>
                </tr>
              </thead>

              <tbody>
                {categories.map((category) => (
                  <tr key={category.id}>
                    <td className="categoryId">
                      #{category.id}
                    </td>

                    <td className="categoryName">
                      {category.name}
                    </td>

                    <td>
                      {new Date(
                        category.createdAt,
                      ).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </article>
    </section>
  )
}

export default CategoryList