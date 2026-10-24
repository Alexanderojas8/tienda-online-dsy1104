
import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
} from 'vitest'

import {
  render,
  screen,
} from '@testing-library/react'

import userEvent from '@testing-library/user-event'

import {
  CarritoProvider,
} from '../context/CarritoContext'

import Productos from './Productos'

const productosDePrueba = [
  {
    id: 1,
    nombre: 'Mouse Gamer',
    descripcion: 'Mouse de alta precisión',
    precio: 20000,
    stock: 5,
    imagen: '/img/mouse.jpg.png',
  },
  {
    id: 2,
    nombre: 'Teclado Gamer',
    descripcion: 'Teclado mecánico',
    precio: 30000,
    stock: 3,
    imagen: '/img/teclado.jpg.png',
  },
]

function renderizarProductos() {
  return render(
    <CarritoProvider>
      <Productos />
    </CarritoProvider>
  )
}

function simularRespuestaExitosa() {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => productosDePrueba,
    })
  )
}

describe('Pruebas de la página Productos', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('muestra el mensaje de carga inicialmente', () => {
    // Arrange
    vi.stubGlobal(
      'fetch',
      vi.fn(() => new Promise(() => {}))
    )

    // Act
    renderizarProductos()

    // Assert
    expect(
      screen.getByText('Cargando productos...')
    ).toBeInTheDocument()
  })

  it('muestra los productos recibidos del backend', async () => {
    // Arrange
    simularRespuestaExitosa()

    // Act
    renderizarProductos()

    // Assert
    expect(
      await screen.findByText('Mouse Gamer')
    ).toBeInTheDocument()

    expect(
      screen.getByText('Teclado Gamer')
    ).toBeInTheDocument()
  })

  it('permite agregar un producto al carrito', async () => {
    // Arrange
    const usuario = userEvent.setup()
    simularRespuestaExitosa()

    renderizarProductos()

    // Act
    const botones = await screen.findAllByRole(
      'button',
      { name: 'Agregar al carrito' }
    )

    await usuario.click(botones[0])

    // Assert
    const carritoGuardado = JSON.parse(
      localStorage.getItem('carrito-react')
    )

    expect(carritoGuardado).toHaveLength(1)
    expect(carritoGuardado[0].nombre).toBe('Mouse Gamer')
    expect(carritoGuardado[0].cantidad).toBe(1)
  })

  it('muestra un error cuando el servidor responde incorrectamente', async () => {
    // Arrange
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
      })
    )

    // Act
    renderizarProductos()

    // Assert
    expect(
      await screen.findByText(
        /No se pudieron cargar los productos/i
      )
    ).toBeInTheDocument()
  })

  it('muestra un error cuando falla la conexión', async () => {
    // Arrange
    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(
        new Error('Failed to fetch')
      )
    )

    // Act
    renderizarProductos()

    // Assert
    expect(
      await screen.findByText(/Failed to fetch/i)
    ).toBeInTheDocument()
  })
})
