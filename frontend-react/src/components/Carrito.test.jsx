
import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'

import Carrito from './Carrito'
import { CarritoProvider } from '../context/CarritoContext'

const mouse = {
  id: 1,
  nombre: 'Mouse Gamer',
  precio: 20000,
  stock: 3,
  cantidad: 2,
}

const teclado = {
  id: 2,
  nombre: 'Teclado Gamer',
  precio: 30000,
  stock: 5,
  cantidad: 1,
}

function renderizarCarrito(productos = []) {
  localStorage.setItem(
    'carrito-react',
    JSON.stringify(productos)
  )

  return render(
    <MemoryRouter>
      <CarritoProvider>
        <Carrito />
      </CarritoProvider>
    </MemoryRouter>
  )
}

describe('Pruebas del componente Carrito', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('muestra un mensaje cuando el carrito está vacío', () => {
    // Arrange y Act
    renderizarCarrito()

    // Assert
    expect(
      screen.getByText(/tu carrito est/i)
    ).toBeInTheDocument()

    expect(
      screen.getByRole('link', { name: 'Ver productos' })
    ).toHaveAttribute('href', '/productos')
  })

  it('muestra los productos agregados al carrito', () => {
    // Arrange y Act
    renderizarCarrito([mouse, teclado])

    // Assert
    expect(screen.getByText('Mouse Gamer')).toBeInTheDocument()
    expect(screen.getByText('Teclado Gamer')).toBeInTheDocument()
  })

  it('muestra la cantidad total de unidades', () => {
    // Arrange y Act
    renderizarCarrito([mouse, teclado])

    // Assert
    expect(screen.getByText('Total de unidades:').parentElement)
      .toHaveTextContent('3')
  })

  it('calcula correctamente el total de la compra', () => {
    // Arrange y Act
    renderizarCarrito([mouse, teclado])

    // Assert
    expect(
      screen.getByRole('heading', { name: /total:/i })
    ).toHaveTextContent('70.000')
  })

  it('permite aumentar la cantidad de un producto', async () => {
    // Arrange
    const usuario = userEvent.setup()
    renderizarCarrito([mouse])

    // Act
    await usuario.click(
      screen.getByRole('button', {
        name: 'Aumentar cantidad de Mouse Gamer',
      })
    )

    // Assert
    expect(
      screen.getByText('Total de unidades:').parentElement
    ).toHaveTextContent('3')
  })

  it('permite disminuir la cantidad de un producto', async () => {
    // Arrange
    const usuario = userEvent.setup()
    renderizarCarrito([mouse])

    // Act
    await usuario.click(
      screen.getByRole('button', {
        name: 'Disminuir cantidad de Mouse Gamer',
      })
    )

    // Assert
    expect(
      screen.getByText('Total de unidades:').parentElement
    ).toHaveTextContent('1')
  })

  it('deshabilita aumentar cuando alcanza el stock', () => {
    // Arrange y Act
    renderizarCarrito([{ ...mouse, cantidad: 3 }])

    // Assert
    expect(
      screen.getByRole('button', {
        name: 'Aumentar cantidad de Mouse Gamer',
      })
    ).toBeDisabled()
  })

  it('permite eliminar un producto', async () => {
    // Arrange
    const usuario = userEvent.setup()
    renderizarCarrito([mouse, teclado])

    const filaMouse = screen.getByText('Mouse Gamer').closest('tr')

    // Act
    await usuario.click(
      within(filaMouse).getByRole('button', {
        name: 'Eliminar',
      })
    )

    // Assert
    expect(screen.queryByText('Mouse Gamer')).not.toBeInTheDocument()
    expect(screen.getByText('Teclado Gamer')).toBeInTheDocument()
  })

  it('permite vaciar completamente el carrito', async () => {
    // Arrange
    const usuario = userEvent.setup()
    renderizarCarrito([mouse])

    // Act
    await usuario.click(
      screen.getByRole('button', {
        name: 'Vaciar carrito',
      })
    )

    // Assert
    expect(
      screen.getByText(/tu carrito est/i)
    ).toBeInTheDocument()
  })

  it('muestra el enlace para finalizar la compra', () => {
    // Arrange y Act
    renderizarCarrito([mouse])

    // Assert
    expect(
      screen.getByRole('link', { name: 'Finalizar compra' })
    ).toHaveAttribute('href', '/checkout')
  })
})
