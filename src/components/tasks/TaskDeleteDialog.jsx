import { useEffect, useRef } from 'react'

function TaskDeleteDialog({
  task,
  isDeleting,
  error,
  onConfirm,
  onCancel,
}) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current

    if (task && !dialog.open) {
      dialog.showModal()
    }

    if (!task && dialog.open) {
      dialog.close()
    }
  }, [task])

  function handleCancel(event) {
    event.preventDefault()

    if (!isDeleting) {
      onCancel()
    }
  }

  function handleConfirm() {
    onConfirm(task.id)
  }

  return (
    <dialog
      ref={dialogRef}
      className="deleteDialog"
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
          <h3>Eliminar tarea</h3>

          <p>
            ¿Estás seguro de que deseas eliminar{' '}
            <strong>{task?.title}</strong>?
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
          type="button"
          className="secondaryButton"
          disabled={isDeleting}
          onClick={onCancel}
        >
          Cancelar
        </button>

        <button
          type="button"
          className="dangerButton"
          disabled={isDeleting}
          onClick={handleConfirm}
        >
          {isDeleting
            ? 'Eliminando...'
            : 'Sí, eliminar'}
        </button>
      </div>
    </dialog>
  )
}

export default TaskDeleteDialog