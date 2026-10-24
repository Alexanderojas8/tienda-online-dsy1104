
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import LoginForm from './LoginForm'

describe('Pruebas del formulario de inicio de sesión', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('muestra los campos de usuario y contraseña', () => {
    render(<LoginForm onLogin={vi.fn()} />)

    expect(screen.getByLabelText('Usuario')).toBeTruthy()
    expect(screen.getByLabelText('Contraseña')).toBeTruthy()
  })

  it('muestra el botón Ingresar', () => {
    render(<LoginForm onLogin={vi.fn()} />)

    expect(
      screen.getByRole('button', { name: 'Ingresar' })
    ).toBeTruthy()
  })

  it('permite escribir el usuario', () => {
    render(<LoginForm onLogin={vi.fn()} />)

    const usuario = screen.getByLabelText('Usuario')

    fireEvent.change(usuario, {
      target: { value: 'Admin' }
    })

    expect(usuario.value).toBe('Admin')
  })

  it('permite escribir la contraseña', () => {
    render(<LoginForm onLogin={vi.fn()} />)

    const password = screen.getByLabelText('Contraseña')

    fireEvent.change(password, {
      target: { value: '123456' }
    })

    expect(password.value).toBe('123456')
  })

  it('ejecuta onLogin al enviar el formulario', () => {
    const onLogin = vi.fn().mockReturnValue(true)

    render(<LoginForm onLogin={onLogin} />)

    fireEvent.change(screen.getByLabelText('Usuario'), {
      target: { value: 'Admin' }
    })

    fireEvent.change(screen.getByLabelText('Contraseña'), {
      target: { value: '123456' }
    })

    fireEvent.click(
      screen.getByRole('button', { name: 'Ingresar' })
    )

    expect(onLogin).toHaveBeenCalledWith('Admin', '123456')
  })

  it('muestra un error cuando las credenciales son incorrectas', () => {
    const onLogin = vi.fn().mockReturnValue(false)

    render(<LoginForm onLogin={onLogin} />)

    fireEvent.change(screen.getByLabelText('Usuario'), {
      target: { value: 'usuarioIncorrecto' }
    })

    fireEvent.change(screen.getByLabelText('Contraseña'), {
      target: { value: 'claveIncorrecta' }
    })

    fireEvent.click(
      screen.getByRole('button', { name: 'Ingresar' })
    )

    expect(
      screen.getByText('Usuario o contraseña incorrectos')
    ).toBeTruthy()
  })

  it('recupera el último usuario desde localStorage', () => {
    localStorage.setItem('ultimoUsuario', 'Admin')

    render(<LoginForm onLogin={vi.fn()} />)

    expect(screen.getByLabelText('Usuario').value).toBe('Admin')
  })
})
