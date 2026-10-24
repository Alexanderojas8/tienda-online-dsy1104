
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
  waitFor,
} from '@testing-library/react'

import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'

import Checkout from './Checkout'
import { CarritoProvider } from '../context/CarritoContext'

const producto = {
  id: 1,
  nombre: 'Mouse Gamer',
  precio: 20000,
  stock: 5,
  cantidad: 2,
}

function renderizarCheckout(productos = [producto]) {
  localStorage.setItem(
    'carrito-react',
    JSON.stringify(productos)
  )

  return render(
    <MemoryRouter>
      <CarritoProvider>
        <Checkout />
      </CarritoProvider>
    </MemoryRouter>
  )
}

async function completarFormulario(usuario) {
  await usuario.type(
    screen.getByLabelText('Nombre completo'),
    'Juan Perez'
  )

  await usuario.type(
    screen.getByLabelText(/Correo electr/i),
    'juan@gmail.com'
  )

  await usuario.type(
    screen.getByLabelText(/Tel/i),
    '+56912345678'
  )

  await usuario.type(
    screen.getByLabelText(/Direcci/i),
    'Avenida Principal 123'
  )

  const region = screen.getByLabelText(/Regi/i)

  await usuario.selectOptions(
    region,
    region.options[1].value
  )

  const comuna = screen.getByLabelText('Comuna')

  await usuario.selectOptions(
    comuna,
    comuna.options[1].value
  )
}

describe('Pruebas del componente Checkout', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('muestra un mensaje cuando el carrito está vacío', () => {
    // Arrange y Act
    renderizarCheckout([])

    // Assert
    expect(
      screen.getByText(/tu carrito est/i)
    ).toBeInTheDocument()

    expect(
      screen.queryByRole('button', {
        name: 'Confirmar compra',
      })
    ).not.toBeInTheDocument()
  })

  it('muestra el formulario cuando hay productos', () => {
    // Arrange y Act
    renderizarCheckout()

    // Assert
    expect(
      screen.getByRole('heading', {
        name: 'Finalizar compra',
      })
    ).toBeInTheDocument()

    expect(
      screen.getByLabelText('Nombre completo')
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', {
        name: 'Confirmar compra',
      })
    ).toBeInTheDocument()
  })

  it('muestra correctamente el resumen del pedido', () => {
    // Arrange y Act
    renderizarCheckout()

    // Assert
    expect(
      screen.getByText(/Mouse Gamer/)
    ).toBeInTheDocument()

    expect(
      screen.getByText('Unidades: 2')
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', {
        name: /Total:/i,
      })
    ).toHaveTextContent('40.000')
  })

  it('muestra errores si se envía el formulario vacío', async () => {
    // Arrange
    const usuario = userEvent.setup()
    const fetchSimulado = vi.fn()
    vi.stubGlobal('fetch', fetchSimulado)

    renderizarCheckout()

    // Act
    await usuario.click(
      screen.getByRole('button', {
        name: 'Confirmar compra',
      })
    )

    // Assert
    expect(
      screen.getByLabelText('Nombre completo')
    ).toHaveClass('is-invalid')

    expect(
      screen.getByLabelText(/Correo electr/i)
    ).toHaveClass('is-invalid')

    expect(
      screen.getByLabelText(/Tel/i)
    ).toHaveClass('is-invalid')

    expect(
      screen.getByLabelText(/Direcci/i)
    ).toHaveClass('is-invalid')

    expect(
      screen.getByLabelText(/Regi/i)
    ).toHaveClass('is-invalid')

    expect(
      screen.getByLabelText('Comuna')
    ).toHaveClass('is-invalid')

    expect(fetchSimulado).not.toHaveBeenCalled()
  })

  it('habilita las comunas al seleccionar una región', async () => {
    // Arrange
    const usuario = userEvent.setup()
    renderizarCheckout()

    const region = screen.getByLabelText(/Regi/i)
    const comuna = screen.getByLabelText('Comuna')

    expect(comuna).toBeDisabled()

    // Act
    await usuario.selectOptions(
      region,
      region.options[1].value
    )

    // Assert
    expect(comuna).toBeEnabled()
    expect(comuna.options.length).toBeGreaterThan(1)
  })

  it('envía correctamente los datos del pedido al backend', async () => {
    // Arrange
    const usuario = userEvent.setup()

    const fetchSimulado = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        pedido: {
          id: 101,
          fecha: '2026-10-24T12:00:00',
          total: 40000,
        },
      }),
    })

    vi.stubGlobal('fetch', fetchSimulado)

    renderizarCheckout()

    // Act
    await completarFormulario(usuario)

    await usuario.click(
      screen.getByRole('button', {
        name: 'Confirmar compra',
      })
    )

    // Assert
    await waitFor(() => {
      expect(fetchSimulado).toHaveBeenCalledTimes(1)
    })

    const [url, opciones] = fetchSimulado.mock.calls[0]
    const cuerpo = JSON.parse(opciones.body)

    expect(url).toBe('http://localhost:3000/api/pedidos')
    expect(opciones.method).toBe('POST')
    expect(cuerpo.cliente.nombre).toBe('Juan Perez')
    expect(cuerpo.cliente.correo).toBe('juan@gmail.com')
    expect(cuerpo.productos).toEqual([
      { id: 1, cantidad: 2 },
    ])
  })

  it('confirma la compra y vacía el carrito', async () => {
    // Arrange
    const usuario = userEvent.setup()

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          pedido: {
            id: 101,
            fecha: '2026-10-24T12:00:00',
            total: 40000,
          },
        }),
      })
    )

    renderizarCheckout()

    // Act
    await completarFormulario(usuario)

    await usuario.click(
      screen.getByRole('button', {
        name: 'Confirmar compra',
      })
    )

    // Assert
    expect(
      await screen.findByText(/Compra confirmada/i)
    ).toBeInTheDocument()

    expect(
      screen.getByText('101')
    ).toBeInTheDocument()

    await waitFor(() => {
      expect(
        JSON.parse(localStorage.getItem('carrito-react'))
      ).toEqual([])
    })
  })

  it('muestra el error devuelto por el servidor', async () => {
    // Arrange
    const usuario = userEvent.setup()

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({
          mensaje: 'Stock insuficiente',
        }),
      })
    )

    renderizarCheckout()

    // Act
    await completarFormulario(usuario)

    await usuario.click(
      screen.getByRole('button', {
        name: 'Confirmar compra',
      })
    )

    // Assert
    expect(
      await screen.findByRole('alert')
    ).toHaveTextContent('Stock insuficiente')

    expect(
      screen.getByRole('button', {
        name: 'Confirmar compra',
      })
    ).toBeEnabled()
  })

  it('maneja errores de conexión con el backend', async () => {
    // Arrange
    const usuario = userEvent.setup()

    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(
        new Error('Error de conexión')
      )
    )

    renderizarCheckout()

    // Act
    await completarFormulario(usuario)

    await usuario.click(
      screen.getByRole('button', {
        name: 'Confirmar compra',
      })
    )

    // Assert
    expect(
      await screen.findByRole('alert')
    ).toHaveTextContent('Error de conexión')
  })
})

