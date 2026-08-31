import { useEffect, useState } from 'react'

function getInitialTheme() {
  const savedTheme = localStorage.getItem('theme')

  if (savedTheme) {
    return savedTheme
  }

  const prefersDarkTheme = window.matchMedia(
    '(prefers-color-scheme: dark)',
  ).matches

  return prefersDarkTheme ? 'dark' : 'light'
}

function ThemeToggle() {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  function toggleTheme() {
    setTheme((currentTheme) =>
      currentTheme === 'light' ? 'dark' : 'light',
    )
  }

  const isDarkTheme = theme === 'dark'

  return (
    <button
      className="themeButton"
      type="button"
      onClick={toggleTheme}
      aria-label={
        isDarkTheme
          ? 'Cambiar a tema claro'
          : 'Cambiar a tema oscuro'
      }
    >
      {isDarkTheme ? '☀️ Tema claro' : '🌙 Tema oscuro'}
    </button>
  )
}

export default ThemeToggle