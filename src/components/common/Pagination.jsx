function Pagination({
  meta,
  isLoading,
  onPageChange,
}) {
  if (!meta || meta.last_page <= 1) {
    return null
  }

  const currentPage = meta.current_page
  const lastPage = meta.last_page

  return (
    <nav
      className="pagination"
      aria-label="Navegación de páginas"
    >
      <button
        type="button"
        className="secondaryButton"
        disabled={isLoading || currentPage === 1}
        onClick={() =>
          onPageChange(currentPage - 1)
        }
      >
        Anterior
      </button>

      <p className="paginationSummary">
        Página <strong>{currentPage}</strong> de{' '}
        <strong>{lastPage}</strong>

        <span>
          {meta.total} registros
        </span>
      </p>

      <button
        type="button"
        className="secondaryButton"
        disabled={
          isLoading || currentPage === lastPage
        }
        onClick={() =>
          onPageChange(currentPage + 1)
        }
      >
        Siguiente
      </button>
    </nav>
  )
}

export default Pagination