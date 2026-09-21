import { useEffect, useRef } from 'react'
import TaskForm from './TaskForm'

function TaskFormDialog({
  isOpen,
  taskToEdit,
  onSaved,
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

  function handleCancel() {
    dialogRef.current.close()
  }

  return (
    <dialog
      ref={dialogRef}
      className="taskDialog"
      onClose={onClose}
    >
      {isOpen && (
        <TaskForm
          taskToEdit={taskToEdit}
          onSaved={onSaved}
          onCancel={handleCancel}
        />
      )}
    </dialog>
  )
}

export default TaskFormDialog