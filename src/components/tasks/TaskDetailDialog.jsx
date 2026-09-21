import { useEffect, useRef } from 'react'

const DATE_FORMATTER = new Intl.DateTimeFormat(
  'es-BO',
  {
    dateStyle: 'medium',
    timeStyle: 'short',
  },
)

function formatDate(date) {
  if (!date) {
    return 'Sin información'
  }

  return DATE_FORMATTER.format(new Date(date))
}

function TaskDetailDialog({
  isOpen,
  task,
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

  function handleClose() {
    dialogRef.current.close()
  }

  return (
    <dialog
      ref={dialogRef}
      className="detailDialog taskDetailDialog"
      onClose={onClose}
    >
      <header className="detailDialogHeader">
        <div>
          <p className="detailDialogEyebrow">
            Información completa
          </p>

          <h3>Detalle de tarea</h3>
        </div>

        <button
          type="button"
          className="dialogCloseButton"
          onClick={handleClose}
          aria-label="Cerrar detalle de tarea"
        >
          ×
        </button>
      </header>

      <div className="detailDialogBody">
        {isLoading ? (
          <p className="emptyMessage">
            Cargando tarea...
          </p>
        ) : error ? (
          <p
            className="feedbackMessage errorMessage"
            role="alert"
          >
            {error}
          </p>
        ) : task ? (
          <dl className="taskDetails">
            <div className="taskDetailItem">
              <dt>ID</dt>
              <dd>#{task.id}</dd>
            </div>

            <div className="taskDetailItem">
              <dt>Título</dt>
              <dd>{task.title}</dd>
            </div>

            <div className="taskDetailItem">
              <dt>Descripción</dt>
              <dd>
                {task.description || 'Sin descripción'}
              </dd>
            </div>

            <div className="taskDetailItem">
              <dt>Categoría</dt>
              <dd>
                {task.category?.name ?? 'Sin categoría'}
              </dd>
            </div>

            <div className="taskDetailItem">
              <dt>Etiquetas</dt>

              <dd>
                {task.tags?.length > 0 ? (
                  <div className="taskTags">
                    {task.tags.map((tag) => (
                      <span
                        className="taskTag"
                        key={tag.id}
                        style={{
                          '--task-tag-color':
                            tag.color ??
                            'var(--color-primary)',
                        }}
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                ) : (
                  'Sin etiquetas'
                )}
              </dd>
            </div>

            <div className="taskDetailItem">
              <dt>Estado</dt>

              <dd>
                <span
                  className={
                    task.isCompleted
                      ? 'taskStatus taskStatusCompleted'
                      : 'taskStatus taskStatusPending'
                  }
                >
                  {task.isCompleted
                    ? 'Completada'
                    : 'Pendiente'}
                </span>
              </dd>
            </div>

            <div className="taskDetailItem">
              <dt>Creada</dt>
              <dd>{formatDate(task.createdAt)}</dd>
            </div>

            <div className="taskDetailItem">
              <dt>Actualizada</dt>
              <dd>{formatDate(task.updatedAt)}</dd>
            </div>
          </dl>
        ) : null}
      </div>

      <footer className="detailDialogActions">
        <button
          type="button"
          className="secondaryButton"
          onClick={handleClose}
        >
          Cerrar
        </button>
      </footer>
    </dialog>
  )
}

export default TaskDetailDialog