
import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CarritoProvider, useCarrito } from './CarritoContext'

const mouse = {
  id: 1,
  nombre: 'Mouse Gamer',
  precio: 20000,
  stock: 5,
}

function CarritoDePrueba() {
  const {
    carrito,
    agregarProducto,
    cambiarCantidad,
    eliminarProducto,
    vaciarCarrito,
    cantidadTotal,
    precioTotal,
  } = useCarrito()

  return (
    <div>
      <p data-testid="cantidad-total">{cantidadTotal}</p>
      <p data-testid="precio-total">{precioTotal}</p>
      <p data-testid="productos">{carrito.length}</p>

      <button onClick={() => agregarProducto(mouse)}>
        Agregar mouse
      </button>

      <button onClick={() => cambiarCantidad(1, 1)}>
        Aumentar cantidad
      </button>

      <button onClick={() => cambiarCantidad(1, -1)}>
        Disminuir cantidad
      </button>

      <button onClick={() => eliminarProducto(1)}>
        Eliminar mouse
      </button>

      <button onClick={vaciarCarrito}>
        Vaciar carrito
      </button>
    </div>
  )
}

function renderizarCarrito() {
  return render(
    <CarritoProvider>
      <CarritoDePrueba />
    </CarritoProvider>
  )
}

describe('Pruebas del CarritoContext', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('inicia con el carrito vacío', () => {
    // Arrange y Act
    renderizarCarrito()

    // Assert
    expect(screen.getByTestId('cantidad-total')).toHaveTextContent('0')
    expect(screen.getByTestId('precio-total')).toHaveTextContent('0')
    expect(screen.getByTestId('productos')).toHaveTextContent('0')
  })

  it('agrega un producto al carrito', async () => {
    // Arrange
    const usuario = userEvent.setup()
    renderizarCarrito()

    // Act
    await usuario.click(screen.getByRole('button', { name: 'Agregar mouse' }))

    // Assert
    expect(screen.getByTestId('cantidad-total')).toHaveTextContent('1')
    expect(screen.getByTestId('precio-total')).toHaveTextContent('20000')
    expect(screen.getByTestId('productos')).toHaveTextContent('1')
  })

  it('aumenta la cantidad de un producto', async () => {
    // Arrange
    const usuario = userEvent.setup()
    renderizarCarrito()

    // Act
    await usuario.click(screen.getByRole('button', { name: 'Agregar mouse' }))
    await usuario.click(screen.getByRole('button', { name: 'Aumentar cantidad' }))

    // Assert
    expect(screen.getByTestId('cantidad-total')).toHaveTextContent('2')
    expect(screen.getByTestId('precio-total')).toHaveTextContent('40000')
  })

  it('disminuye la cantidad de un producto', async () => {
    // Arrange
    const usuario = userEvent.setup()
    renderizarCarrito()

    // Act
    await usuario.click(screen.getByRole('button', { name: 'Agregar mouse' }))
    await usuario.click(screen.getByRole('button', { name: 'Agregar mouse' }))
    await usuario.click(screen.getByRole('button', { name: 'Disminuir cantidad' }))

    // Assert
    expect(screen.getByTestId('cantidad-total')).toHaveTextContent('1')
  })

  it('elimina un producto del carrito', async () => {
    // Arrange
    const usuario = userEvent.setup()
    renderizarCarrito()

    // Act
    await usuario.click(screen.getByRole('button', { name: 'Agregar mouse' }))
    await usuario.click(screen.getByRole('button', { name: 'Eliminar mouse' }))

    // Assert
    expect(screen.getByTestId('productos')).toHaveTextContent('0')
    expect(screen.getByTestId('precio-total')).toHaveTextContent('0')
  })

  it('vacía completamente el carrito', async () => {
    // Arrange
    const usuario = userEvent.setup()
    renderizarCarrito()

    // Act
    await usuario.click(screen.getByRole('button', { name: 'Agregar mouse' }))
    await usuario.click(screen.getByRole('button', { name: 'Vaciar carrito' }))

    // Assert
    expect(screen.getByTestId('cantidad-total')).toHaveTextContent('0')
    expect(screen.getByTestId('productos')).toHaveTextContent('0')
  })

  it('guarda los productos en localStorage', async () => {
    // Arrange
    const usuario = userEvent.setup()
    renderizarCarrito()

    // Act
    await usuario.click(screen.getByRole('button', { name: 'Agregar mouse' }))

    // Assert
    const guardado = JSON.parse(localStorage.getItem('carrito-react'))

    expect(guardado).toHaveLength(1)
    expect(guardado[0].nombre).toBe('Mouse Gamer')
    expect(guardado[0].cantidad).toBe(1)
  })

  it('recupera los productos guardados en localStorage', () => {
    // Arrange
    localStorage.setItem(
      'carrito-react',
      JSON.stringify([{ ...mouse, cantidad: 2 }])
    )

    // Act
    renderizarCarrito()

    // Assert
    expect(screen.getByTestId('cantidad-total')).toHaveTextContent('2')
    expect(screen.getByTestId('precio-total')).toHaveTextContent('40000')
  })

  it('maneja datos inválidos en localStorage', () => {
    // Arrange
    localStorage.setItem('carrito-react', 'datos-invalidos')

    // Act
    renderizarCarrito()

    // Assert
    expect(screen.getByTestId('cantidad-total')).toHaveTextContent('0')
  })
})
