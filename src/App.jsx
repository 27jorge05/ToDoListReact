import { useState } from 'react'
import CategoryList from './components/categories/CategoryList'
import TagList from './components/tags/TagList'
import TaskList from './components/tasks/TaskList'
import ThemeToggle from './components/ThemeToggle'

function App() {
  const [activeView, setActiveView] = useState('tasks')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)

  function handleNavigation(view) {
    if (view === 'tasks') {
      setSelectedCategory(null)
    }

    setActiveView(view)
    setIsSidebarOpen(false)
  }

  function handleCategorySelect(category) {
    setSelectedCategory(category)
    setActiveView('tasks')
    setIsSidebarOpen(false)
  }

  return (
    <div className="app">
      <header className="appHeader">
        <button
          type="button"
          className="menuButton"
          aria-label="Abrir menú"
          aria-controls="appSidebar"
          aria-expanded={isSidebarOpen}
          onClick={() => setIsSidebarOpen(true)}
        >
          <span aria-hidden="true">☰</span>
        </button>

        <h1 className="appBrand">ToDoList</h1>

        <ThemeToggle />
      </header>

      <div className="appLayout">
        <aside
          id="appSidebar"
          className={`appSidebar ${isSidebarOpen ? 'open' : ''}`}
        >
          <div className="sidebarHeader">
            <p>Menú principal</p>

            <button
              type="button"
              className="sidebarCloseButton"
              aria-label="Cerrar menú"
              onClick={() => setIsSidebarOpen(false)}
            >
              ×
            </button>
          </div>

          <nav className="appNavigation" aria-label="Navegación principal">
            <button
              type="button"
              className={activeView === 'tasks' ? 'active' : ''}
              onClick={() => handleNavigation('tasks')}
            >
              <span aria-hidden="true">✓</span>
              Tareas
            </button>

            <button
              type="button"
              className={activeView === 'categories' ? 'active' : ''}
              onClick={() => handleNavigation('categories')}
            >
              <span aria-hidden="true">▦</span>
              Categorías
            </button>

            <button
              type="button"
              className={activeView === 'tags' ? 'active' : ''}
              onClick={() => handleNavigation('tags')}
            >
              <span aria-hidden="true">#</span>
              Etiquetas
            </button>
          </nav>
        </aside>

        {isSidebarOpen && (
          <button
            type="button"
            className="sidebarBackdrop"
            aria-label="Cerrar menú"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <main className="appContent">
          {activeView === 'tasks' && (
            <TaskList
              selectedCategory={selectedCategory}
              onClearCategory={() => setSelectedCategory(null)}
            />
          )}
          {activeView === 'categories' && (
            <CategoryList onCategorySelect={handleCategorySelect} />
          )}
          {activeView === 'tags' && <TagList />}
        </main>
      </div>
    </div>
  )
}

export default App
