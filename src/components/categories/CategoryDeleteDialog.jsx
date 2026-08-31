import { useEffect, useRef } from 'react'

function CategoryDeleteDialog({
  category,
  isDeleting,
  error,
  onConfirm,
  onCancel,
}) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current

    if (category && !dialog.open) {
      dialog.showModal()
    }

    if (!category && dialog.open) {
      dialog.close()
    }
  }, [category])

  function handleCancel(event) {
    event.preventDefault()

    if (!isDeleting) {
      onCancel()
    }
  }

  function handleConfirm() {
    onConfirm(category.id)
  }

  return (
    <dialog
      className="deleteDialog"
      ref={dialogRef}
      onCancel={handleCancel}
    >
      <div className="deleteDialogContent">
        <div
          className="deleteDialogIcon"
          aria-hidden="true"
        >
          !
        </div>

        <div>
          <h3>Eliminar categoría</h3>

          <p>
            ¿Estás seguro de que deseas eliminar{' '}
            <strong>{category?.name}</strong>?
          </p>

          <p className="deleteDialogWarning">
            Esta acción no se puede deshacer.
          </p>
        </div>
      </div>

      {error && (
        <p
          className="feedbackMessage errorMessage"
          role="alert"
        >
          {error}
        </p>
      )}

      <div className="deleteDialogActions">
        <button
          className="secondaryButton"
          type="button"
          onClick={onCancel}
          disabled={isDeleting}
        >
          Cancelar
        </button>

        <button
          className="dangerButton"
          type="button"
          onClick={handleConfirm}
          disabled={isDeleting}
        >
          {isDeleting
            ? 'Eliminando...'
            : 'Sí, eliminar'}
        </button>
      </div>
    </dialog>
  )
}

export default CategoryDeleteDialog