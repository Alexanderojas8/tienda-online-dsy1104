
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProductoCard from './ProductoCard'

describe('Pruebas del componente ProductoCard', () => {
  const producto = {
    id: 1,
    nombre: 'Mouse Gamer Pro',
    descripcion: 'Mouse gamer de alta precisión',
    precio: 20000,
    stock: 10,
    imagen: '/img/mouse.jpg.png',
  }

  it('muestra los datos del producto', () => {
    // Arrange
    const onAgregar = vi.fn()

    // Act
    render(
      <ProductoCard
        producto={producto}
        cantidadEnCarrito={0}
        onAgregar={onAgregar}
      />
    )

    // Assert
    expect(
      screen.getByText('Mouse Gamer Pro')
    ).toBeInTheDocument()

    expect(
      screen.getByText('$20.000')
    ).toBeInTheDocument()

    expect(
      screen.getByAltText('Mouse Gamer Pro')
    ).toHaveAttribute('src', '/img/mouse.jpg.png')
  })

  it('ejecuta la función al agregar al carrito', async () => {
    // Arrange
    const usuario = userEvent.setup()
    const onAgregar = vi.fn()

    render(
      <ProductoCard
        producto={producto}
        cantidadEnCarrito={0}
        onAgregar={onAgregar}
      />
    )

    // Act
    await usuario.click(
      screen.getByRole('button', {
        name: 'Agregar al carrito',
      })
    )

    // Assert
    expect(onAgregar).toHaveBeenCalledTimes(1)
    expect(onAgregar).toHaveBeenCalledWith(producto)
  })

  it('deshabilita el botón cuando no hay stock', () => {
    // Arrange
    const productoSinStock = {
      ...producto,
      stock: 0,
    }

    // Act
    render(
      <ProductoCard
        producto={productoSinStock}
        cantidadEnCarrito={0}
        onAgregar={vi.fn()}
      />
    )

    // Assert
    expect(
      screen.getByRole('button', {
        name: 'Sin stock',
      })
    ).toBeDisabled()
  })
})

