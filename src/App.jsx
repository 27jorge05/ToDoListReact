import CategoryList from './components/categories/CategoryList'
import ThemeToggle from './components/ThemeToggle'

function App() {
  return (
    <div className="app">
      <header className="appHeader">
        <h1 className="appBrand">ToDoList</h1>
        <ThemeToggle />
      </header>

      <main className="appContent">
        <CategoryList />
      </main>
    </div>
  )
}

export default App