import { useEffect, useState } from 'react'
import {
    deleteCategory,
    getAllCategories,
    getOneCategory,
} from '../../services/category.service'

import CategoryDeleteDialog from './CategoryDeleteDialog'
import CategoryDetailDialog from './CategoryDetailDialog'
import CategoryForm from './CategoryForm'
import '../../styles/resource.css'
import Pagination from '../common/Pagination'



function CategoryList({ onCategorySelect }) {
    const [categories, setCategories] = useState([])
    const [categoryToEdit, setCategoryToEdit] = useState(null)
    const [categoryToDelete, setCategoryToDelete] = useState(null)
    const [isDeleting, setIsDeleting] = useState(false)
    const [deleteError, setDeleteError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [selectedCategoryId, setSelectedCategoryId] = useState(null)
    const [categoryDetail, setCategoryDetail] = useState(null)
    const [isDetailLoading, setIsDetailLoading] = useState(false)
    const [detailError, setDetailError] = useState(null)
    const [page, setPage] = useState(1)
    const [pagination, setPagination] = useState(null)


    async function loadCategories(pageNumber = page) {
        try {
            setIsLoading(true)
            setError(null)

            const response =
                await getAllCategories(pageNumber)

            setCategories(response.data ?? [])
            setPagination(response.meta ?? null)
        } catch (loadError) {
            setError(loadError.message)
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        loadCategories(page)
    }, [page])

    async function handleCategoryCreated() {
        if (page === 1) {
            await loadCategories(1)
        } else {
            setPage(1)
        }
    }

    function handleEditClick(category) {
        setCategoryToEdit(category)

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    async function handleCategoryUpdated() {
        setCategoryToEdit(null)
        await loadCategories(page)
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



            if (categoryToEdit?.id === categoryId) {
                setCategoryToEdit(null)
            }

            setCategoryToDelete(null)

            if (categories.length === 1 && page > 1) {
                setPage((currentPage) => currentPage - 1)
            } else {
                await loadCategories(page)
            }
        } catch (error) {
            setDeleteError(error.message)
        } finally {
            setIsDeleting(false)
        }
    }

    async function handleDetailClick(categoryId) {
        try {
            setSelectedCategoryId(categoryId)
            setCategoryDetail(null)
            setDetailError(null)
            setIsDetailLoading(true)

            const response = await getOneCategory(categoryId)

            setCategoryDetail(response.data)
        } catch (error) {
            setDetailError(error.message)
        } finally {
            setIsDetailLoading(false)
        }
    }

    function handleCloseDetail() {
        setSelectedCategoryId(null)
        setCategoryDetail(null)
        setDetailError(null)
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
                                            <button
                                                type="button"
                                                className="categoryFilterButton"
                                                onClick={() => onCategorySelect(category)}
                                            >
                                                {category.name}
                                            </button>
                                        </td>

                                        <td>
                                            {new Date(
                                                category.createdAt,
                                            ).toLocaleDateString()}
                                        </td>

                                        <td>
                                            <div className="tableActions">
                                                <button
                                                    className="viewButton"
                                                    type="button"
                                                    onClick={() =>
                                                        handleDetailClick(category.id)
                                                    }
                                                >
                                                    Ver detalle
                                                </button>
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
                <Pagination
                    meta={pagination}
                    isLoading={isLoading}
                    onPageChange={setPage}
                />
            </article>
            <CategoryDeleteDialog
                category={categoryToDelete}
                isDeleting={isDeleting}
                error={deleteError}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
            <CategoryDetailDialog
                isOpen={selectedCategoryId !== null}
                category={categoryDetail}
                isLoading={isDetailLoading}
                error={detailError}
                onClose={handleCloseDetail}
            />
        </section>
    )
}

export default CategoryList
