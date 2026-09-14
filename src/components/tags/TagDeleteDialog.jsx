import { useEffect, useRef } from 'react'

function TagDeleteDialog({ tag, isDeleting, onConfirm, onClose }) {
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
          <h2>Eliminar etiqueta</h2>

          <p>
            ¿Estás seguro de eliminar la etiqueta{' '}
            <strong>{tag.name}</strong>?
          </p>

          <p className="dialogWarning">
            Esta acción no se puede deshacer.
          </p>

          <div className="formActions">
            <button
              type="button"
              className="dangerButton"
              disabled={isDeleting}
              onClick={() => onConfirm(tag.id)}
            >
              {isDeleting ? 'Eliminando...' : 'Sí, eliminar'}
            </button>

            <button
              type="button"
              className="secondaryButton"
              disabled={isDeleting}
              onClick={() => dialogRef.current.close()}
            >
              Cancelar
            </button>
          </div>
        </>
      )}
    </dialog>
  )
}

export default TagDeleteDialog