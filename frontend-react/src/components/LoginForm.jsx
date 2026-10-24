
import { useState } from 'react'

export default function LoginForm({ onLogin }) {
  const [usuario, setUsuario] = useState(
    () => localStorage.getItem('ultimoUsuario') || ''
  )

  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    const loginCorrecto = onLogin(usuario, password)

    if (!loginCorrecto) {
      setError('Usuario o contraseña incorrectos')
      return
    }

    setError('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="usuario" className="form-label">
          Usuario
        </label>

        <input
          id="usuario"
          type="text"
          className="form-control"
          value={usuario}
          onChange={(event) => setUsuario(event.target.value)}
          autoComplete="username"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Contraseña
        </label>

        <input
          id="password"
          type="password"
          className="form-control"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
          required
        />
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <button
        type="submit"
        className="btn btn-primary w-100"
      >
        Ingresar
      </button>
    </form>
  )
}
