import { useEffect, useRef } from 'react'

function formatDate(date) {
  if (!date) {
    return 'Sin información'
  }

  return new Intl.DateTimeFormat('es-BO', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(date))
}

function CategoryDetailDialog({
  isOpen,
  category,
  isLoading,
  error,
  onClose,
}) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current

    if (isOpen && !dialog.open) {
      dialog.showModal()
    }

    if (!isOpen && dialog.open) {
      dialog.close()
    }
  }, [isOpen])

  function handleCancel(event) {
    event.preventDefault()
    onClose()
  }

  return (
    <dialog
      className="detailDialog"
      ref={dialogRef}
      onCancel={handleCancel}
    >
      <header className="detailDialogHeader">
        <div>
          <p className="detailDialogEyebrow">
            Información
          </p>

          <h3>Detalle de categoría</h3>
        </div>

        <button
          className="dialogCloseButton"
          type="button"
          onClick={onClose}
          aria-label="Cerrar detalle"
        >
          ×
        </button>
      </header>

      <div className="detailDialogBody">
        {isLoading && (
          <p>Cargando información...</p>
        )}

        {error && (
          <p
            className="feedbackMessage errorMessage"
            role="alert"
          >
            {error}
          </p>
        )}

        {!isLoading && !error && category && (
          <dl className="categoryDetails">
            <div className="categoryDetailItem">
              <dt>Identificador</dt>
              <dd>#{category.id}</dd>
            </div>

            <div className="categoryDetailItem">
              <dt>Nombre</dt>
              <dd>{category.name}</dd>
            </div>

            <div className="categoryDetailItem">
              <dt>Fecha de creación</dt>
              <dd>{formatDate(category.createdAt)}</dd>
            </div>

            <div className="categoryDetailItem">
              <dt>Última actualización</dt>
              <dd>{formatDate(category.updatedAt)}</dd>
            </div>
          </dl>
        )}
      </div>

      <footer className="detailDialogActions">
        <button
          className="primaryButton"
          type="button"
          onClick={onClose}
        >
          Cerrar
        </button>
      </footer>
    </dialog>
  )
}

export default CategoryDetailDialog