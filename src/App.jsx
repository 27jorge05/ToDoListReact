import { useEffect } from "react"
import { getAll } from "./services/tarea.service"


function App() {
  useEffect(() => {
    async function loadTasks() {
      try {
        const response = await getAll()
        console.log(response)
      } catch (error) {
        console.error(error)
      }

    }
    loadTasks()
  }, [])

  return <h1>Hola Mundo</h1>
}

export default App
