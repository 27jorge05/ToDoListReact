import { useState } from 'react'
import CategoryList from './components/categories/CategoryList'
import TagList from './components/tags/TagList'
import ThemeToggle from './components/ThemeToggle'

function App() {
  const [activeView, setActiveView] = useState('categories')

  return (
    <div className="app">
      <header className="appHeader">
        <h1 className="appBrand">ToDoList</h1>

        <nav className="appNavigation" aria-label="Navegación principal">
          <button
            type="button"
            className={activeView === 'categories' ? 'active' : ''}
            onClick={() => setActiveView('categories')}
          >
            Categorías
          </button>

          <button
            type="button"
            className={activeView === 'tags' ? 'active' : ''}
            onClick={() => setActiveView('tags')}
          >
            Etiquetas
          </button>
        </nav>

        <ThemeToggle />
      </header>

      <main className="appContent">
        {activeView === 'categories' ? <CategoryList /> : <TagList />}
      </main>
    </div>
  )
}

export default App