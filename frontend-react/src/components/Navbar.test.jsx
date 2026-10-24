
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, useLocation } from 'react-router-dom'
import Navbar from './Navbar'

// Simulamos el contexto del carrito para probar
// Navbar sin depender de toda la aplicación.
vi.mock('../context/CarritoContext', () => ({
  useCarrito: () => ({
    cantidadTotal: 2,
  }),
}))

// Componente auxiliar para comprobar la ruta actual.
function RutaActual() {
  const location = useLocation()

  return (
    <span data-testid="ruta-actual">
      {location.pathname}
    </span>
  )
}

describe('Pruebas del componente Navbar', () => {
  it('muestra los enlaces principales', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Navbar />
      </MemoryRouter>
    )

    expect(
      screen.getByRole('link', { name: 'Inicio' })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('link', { name: 'Productos' })
    ).toHaveAttribute('href', '/productos')

    expect(
      screen.getByRole('link', { name: 'Contacto' })
    ).toHaveAttribute('href', '/contacto')
  })

  it('muestra la cantidad de productos del carrito', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )

    const enlaceCarrito = screen.getByRole('link', {
      name: /carrito/i,
    })

    expect(enlaceCarrito).toHaveTextContent('2')
    expect(enlaceCarrito).toHaveAttribute('href', '/carrito')
  })

  it('marca como activo el enlace de la página actual', () => {
    render(
      <MemoryRouter initialEntries={['/productos']}>
        <Navbar />
      </MemoryRouter>
    )

    expect(
      screen.getByRole('link', { name: 'Productos' })
    ).toHaveClass('active')
  })

  it('permite navegar al carrito', async () => {
    const usuario = userEvent.setup()

    render(
      <MemoryRouter initialEntries={['/']}>
        <Navbar />
      </MemoryRouter>
    )

    await usuario.click(
      screen.getByRole('link', { name: /carrito/i })
    )

    expect(
      screen.getByRole('link', { name: /carrito/i })
    ).toHaveClass('active')
  })

  it('muestra Iniciar sesión cuando no hay usuario', () => {
    render(
      <MemoryRouter>
        <Navbar usuarioLogin="" onLogout={vi.fn()} />
      </MemoryRouter>
    )

    expect(
      screen.getByRole('link', { name: 'Iniciar sesión' })
    ).toHaveAttribute('href', '/login')

    expect(
      screen.queryByRole('link', { name: 'Administración' })
    ).not.toBeInTheDocument()
  })

  it('muestra el usuario y Administración cuando hay sesión', () => {
    render(
      <MemoryRouter>
        <Navbar usuarioLogin="Admin" onLogout={vi.fn()} />
      </MemoryRouter>
    )

    expect(
      screen.getByText('Hola, Admin')
    ).toBeInTheDocument()

    expect(
      screen.getByRole('link', { name: 'Administración' })
    ).toHaveAttribute('href', '/admin')

    expect(
      screen.getByRole('button', { name: 'Cerrar sesión' })
    ).toBeInTheDocument()
  })

  it('ejecuta onLogout al cerrar sesión', async () => {
    const usuario = userEvent.setup()
    const onLogout = vi.fn()

    render(
      <MemoryRouter>
        <Navbar usuarioLogin="Admin" onLogout={onLogout} />
      </MemoryRouter>
    )

    await usuario.click(
      screen.getByRole('button', { name: 'Cerrar sesión' })
    )

    expect(onLogout).toHaveBeenCalledTimes(1)
  })

  it('redirige al login después de cerrar sesión', async () => {
    const usuario = userEvent.setup()
    const onLogout = vi.fn()

    render(
      <MemoryRouter initialEntries={['/admin']}>
        <Navbar usuarioLogin="Admin" onLogout={onLogout} />
        <RutaActual />
      </MemoryRouter>
    )

    await usuario.click(
      screen.getByRole('button', { name: 'Cerrar sesión' })
    )

    expect(onLogout).toHaveBeenCalledTimes(1)

    expect(
      screen.getByTestId('ruta-actual')
    ).toHaveTextContent('/login')
  })
})
