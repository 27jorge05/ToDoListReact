import { useState } from 'react'
import { loginUser } from '../../services/auth.service'
import { saveAuthToken } from '../../services/auth.storage'
import ThemeToggle from '../ThemeToggle'

const DEVICE_NAME = 'ToDoList React'

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()

    const normalizedEmail = email.trim()

    if (!normalizedEmail) {
      setError('El correo electrónico es obligatorio.')
      return
    }

    if (!password) {
      setError('La contraseña es obligatoria.')
      return
    }

    try {
      setIsSubmitting(true)
      setError('')

      const response = await loginUser({
        email: normalizedEmail,
        password,
        deviceName: DEVICE_NAME,
      })

      saveAuthToken(response.data.token)
      onLogin(response.data.user)
    } catch (loginError) {
      setError(loginError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="loginPage">
      <header className="loginHeader">
        <h1 className="appBrand">ToDoList</h1>
        <ThemeToggle />
      </header>

      <main className="loginContent">
        <section className="loginCard">
          <div className="loginIntroduction">
            <p className="detailDialogEyebrow">
              Bienvenido
            </p>

            <h2>Inicia sesión</h2>

            <p>
              Ingresa tus credenciales para administrar
              tus tareas.
            </p>
          </div>

          <form
            className="loginForm"
            onSubmit={handleSubmit}
          >
            <div className="formField">
              <label
                className="formLabel"
                htmlFor="loginEmail"
              >
                Correo electrónico
              </label>

              <input
                className="formInput"
                id="loginEmail"
                name="email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder="nombre@ejemplo.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="formField">
              <label
                className="formLabel"
                htmlFor="loginPassword"
              >
                Contraseña
              </label>

              <input
                className="formInput"
                id="loginPassword"
                name="password"
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                placeholder="Tu contraseña"
                autoComplete="current-password"
                required
              />
            </div>

            {error && (
              <p
                className="feedbackMessage errorMessage"
                role="alert"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              className="primaryButton loginButton"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? 'Iniciando sesión...'
                : 'Iniciar sesión'}
            </button>
          </form>
        </section>
      </main>
    </div>
  )
}

export default LoginPage