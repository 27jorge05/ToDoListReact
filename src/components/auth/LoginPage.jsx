import { useState } from 'react'
import {
    loginUser,
    registerUser,
} from '../../services/auth.service'
import {
  saveAuthToken,
  saveAuthUser,
} from '../../services/auth.storage'
import ThemeToggle from '../ThemeToggle'

function LoginPage({ onLogin }) {
  const [mode, setMode] = useState('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isRegisterMode = mode === 'register'

  function switchMode(nextMode) {
    setMode(nextMode)
    setError('')
    setName('')
    setPassword('')
  }

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

    if (isRegisterMode && !name.trim()) {
      setError('El nombre es obligatorio.')
      return
    }

    try {
      setIsSubmitting(true)
      setError('')

      if (isRegisterMode) {
        await registerUser({
          name: name.trim(),
          email: normalizedEmail,
          password,
        })

        const response = await loginUser({
          email: normalizedEmail,
          password,
        })

        saveAuthToken(response.data.token)
        saveAuthUser(response.data.user)
        onLogin(response.data.user)
        return
      }

      const response = await loginUser({
        email: normalizedEmail,
        password,
      })

      saveAuthToken(response.data.token)
      saveAuthUser(response.data.user)
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
              {isRegisterMode ? 'Bienvenido' : 'Bienvenido'}
            </p>

            <h2>
              {isRegisterMode
                ? 'Crea tu cuenta'
                : 'Inicia sesión'}
            </h2>

            <p>
              {isRegisterMode
                ? 'Regístrate para administrar tus tareas.'
                : 'Ingresa tus credenciales para administrar tus tareas.'}
            </p>
          </div>

          <form
            className="loginForm"
            onSubmit={handleSubmit}
          >
            {isRegisterMode && (
              <div className="formField">
                <label
                  className="formLabel"
                  htmlFor="registerName"
                >
                  Nombre
                </label>

                <input
                  className="formInput"
                  id="registerName"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  placeholder="Tu nombre"
                  autoComplete="name"
                  maxLength={100}
                />
              </div>
            )}

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
                placeholder={isRegisterMode
                  ? 'Mínimo 8 caracteres'
                  : 'Tu contraseña'}
                autoComplete={isRegisterMode
                  ? 'new-password'
                  : 'current-password'}
                minLength={isRegisterMode ? 8 : undefined}
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
                ? isRegisterMode
                  ? 'Registrando...'
                  : 'Iniciando sesión...'
                : isRegisterMode
                  ? 'Crear cuenta'
                  : 'Iniciar sesión'}
            </button>
          </form>

          <div className="loginSwitch">
            <p>
              {isRegisterMode
                ? '¿Ya tienes cuenta?'
                : '¿Aún no tienes cuenta?'}
            </p>

            <button
              type="button"
              className="linkButton"
              disabled={isSubmitting}
              onClick={() => {
                switchMode(isRegisterMode ? 'login' : 'register')
              }}
            >
              {isRegisterMode ? 'Inicia sesión' : 'Regístrate'}
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}

export default LoginPage