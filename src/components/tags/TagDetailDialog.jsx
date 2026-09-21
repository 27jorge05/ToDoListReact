import { useEffect, useRef } from 'react'

const dateFormatter = new Intl.DateTimeFormat('es-BO', {
  dateStyle: 'medium',
  timeStyle: 'short',
})

function formatDate(date) {
  if (!date) {
    return 'Sin información'
  }

  return dateFormatter.format(new Date(date))
}

function TagDetailDialog({ tag, onClose }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current

    if (tag && !dialog.open) {
      dialog.showModal()
    }

    if (!tag && dialog.open) {
      dialog.close()
    }
  }, [tag])

  return (
    <dialog
      ref={dialogRef}
      className="resourceDialog"
      onClose={onClose}
    >
      {tag && (
        <>
          <div className="dialogHeader">
            <h2>Detalle de etiqueta</h2>

            <button
              type="button"
              className="iconButton"
              onClick={() => dialogRef.current.close()}
              aria-label="Cerrar detalle"
            >
              ×
            </button>
          </div>

          <dl className="detailList">
            <div>
              <dt>ID</dt>
              <dd>{tag.id}</dd>
            </div>

            <div>
              <dt>Nombre</dt>
              <dd>{tag.name}</dd>
            </div>

            <div>
              <dt>Color</dt>
              <dd className="colorDetail">
                <span
                  className="colorPreview"
                  style={{ backgroundColor: tag.color ?? '#94a3b8' }}
                />
                {tag.color ?? 'Sin color'}
              </dd>
            </div>

            <div>
              <dt>Creada</dt>
              <dd>{formatDate(tag.createdAt)}</dd>
            </div>

            <div>
              <dt>Actualizada</dt>
              <dd>{formatDate(tag.updatedAt)}</dd>
            </div>
          </dl>
        </>
      )}
    </dialog>
  )
}

export default TagDetailDialog