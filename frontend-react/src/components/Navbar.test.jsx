
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Navbar from './Navbar'

// Simulamos el Context del carrito para probar
// el Navbar sin depender de toda la aplicación.
vi.mock('../context/CarritoContext', () => ({
  useCarrito: () => ({
    cantidadTotal: 2,
  }),
}))

describe('Pruebas del componente Navbar', () => {
  it('muestra los enlaces principales', () => {
    // Arrange
    render(
      <MemoryRouter initialEntries={['/']}>
        <Navbar />
      </MemoryRouter>
    )

    // Act
    const enlaceInicio = screen.getByRole('link', {
      name: 'Inicio',
    })

    // Assert
    expect(enlaceInicio).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'Productos' })
    ).toHaveAttribute('href', '/productos')

    expect(
      screen.getByRole('link', { name: 'Contacto' })
    ).toHaveAttribute('href', '/contacto')
  })

  it('muestra la cantidad de productos del carrito', () => {
    // Arrange y Act
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )

    // Assert
    const enlaceCarrito = screen.getByRole('link', {
      name: /carrito/i,
    })

    expect(enlaceCarrito).toHaveTextContent('2')
    expect(enlaceCarrito).toHaveAttribute('href', '/carrito')
  })

  it('marca como activo el enlace de la página actual', () => {
    // Arrange y Act
    render(
      <MemoryRouter initialEntries={['/productos']}>
        <Navbar />
      </MemoryRouter>
    )

    // Assert
    expect(
      screen.getByRole('link', { name: 'Productos' })
    ).toHaveClass('active')
  })

  it('permite navegar al carrito', async () => {
    // Arrange
    const usuario = userEvent.setup()

    render(
      <MemoryRouter initialEntries={['/']}>
        <Navbar />
      </MemoryRouter>
    )

    // Act
    await usuario.click(
      screen.getByRole('link', { name: /carrito/i })
    )

    // Assert
    expect(
      screen.getByRole('link', { name: /carrito/i })
    ).toHaveClass('active')
  })
})
