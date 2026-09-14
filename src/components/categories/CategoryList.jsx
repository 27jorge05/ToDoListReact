import { useEffect, useState } from 'react'
import {
    deleteCategory,
    getAllCategories,
} from '../../services/category.service'
import CategoryDeleteDialog from './CategoryDeleteDialog'
import CategoryForm from './CategoryForm'
import './CategoryList.css'


function sortCategories(categories) {
    return [...categories].sort(
        (firstCategory, secondCategory) =>
            firstCategory.name.localeCompare(
                secondCategory.name,
            ),
    )
}

function CategoryList() {
    const [categories, setCategories] = useState([])
    const [categoryToEdit, setCategoryToEdit] = useState(null)
    const [categoryToDelete, setCategoryToDelete] = useState(null)
    const [isDeleting, setIsDeleting] = useState(false)
    const [deleteError, setDeleteError] = useState(null)
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
        setCategories((currentCategories) =>
            sortCategories([
                ...currentCategories,
                newCategory,
            ]),
        )
    }

    function handleEditClick(category) {
        setCategoryToEdit(category)

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    function handleCategoryUpdated(updatedCategory) {
        setCategories((currentCategories) =>
            sortCategories(
                currentCategories.map((category) =>
                    category.id === updatedCategory.id
                        ? updatedCategory
                        : category,
                ),
            ),
        )

        setCategoryToEdit(null)
    }

    function handleCancelEdit() {
        setCategoryToEdit(null)
    }
    function handleDeleteClick(category) {
        setCategoryToDelete(category)
        setDeleteError(null)
    }

    function handleCancelDelete() {
        if (!isDeleting) {
            setCategoryToDelete(null)
            setDeleteError(null)
        }
    }

    async function handleConfirmDelete(categoryId) {
        try {
            setIsDeleting(true)
            setDeleteError(null)

            await deleteCategory(categoryId)

            setCategories((currentCategories) =>
                currentCategories.filter(
                    (category) => category.id !== categoryId,
                ),
            )

            if (categoryToEdit?.id === categoryId) {
                setCategoryToEdit(null)
            }

            setCategoryToDelete(null)
        } catch (error) {
            setDeleteError(error.message)
        } finally {
            setIsDeleting(false)
        }
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
                categoryToEdit={categoryToEdit}
                onCategoryCreated={handleCategoryCreated}
                onCategoryUpdated={handleCategoryUpdated}
                onCancelEdit={handleCancelEdit}
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
                                    <th scope="col">Acciones</th>
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

                                        <td>
                                            <div className="tableActions">
                                                <button
                                                    className="editButton"
                                                    type="button"
                                                    onClick={() =>
                                                        handleEditClick(category)
                                                    }
                                                >
                                                    Editar
                                                </button>

                                                <button
                                                    className="deleteButton"
                                                    type="button"
                                                    onClick={() =>
                                                        handleDeleteClick(category)
                                                    }
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
            </article>
            <CategoryDeleteDialog
                category={categoryToDelete}
                isDeleting={isDeleting}
                error={deleteError}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        </section>
    )
}

export default CategoryList