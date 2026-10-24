
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
  within,
} from '@testing-library/react'

import userEvent from '@testing-library/user-event'

import AdminProductos from './AdminProductos'

const API_URL = 'http://localhost:3000/api/productos'

const productosDePrueba = [
  {
    id: 1,
    codigo: 'MOU001',
    nombre: 'Mouse Gamer',
    descripcion: 'Mouse de alta precisión',
    precio: 20000,
    stock: 10,
    stockCritico: 5,
    categoria: 'Perifericos',
    imagen: '',
  },
  {
    id: 2,
    codigo: 'TEC001',
    nombre: 'Teclado Gamer',
    descripcion: 'Teclado mecánico',
    precio: 30000,
    stock: 3,
    stockCritico: 5,
    categoria: 'Perifericos',
    imagen: '',
  },
  {
    id: 3,
    codigo: 'AUD001',
    nombre: 'Audifonos Gamer',
    descripcion: 'Audífonos para juegos',
    precio: 15000,
    stock: 0,
    stockCritico: 5,
    categoria: 'Audio',
    imagen: '',
  },
]

function respuestaExitosa(datos) {
  return {
    ok: true,
    json: async () => datos,
  }
}

function simularListado(productos = productosDePrueba) {
  const fetchSimulado = vi.fn().mockResolvedValue(
    respuestaExitosa(productos)
  )

  vi.stubGlobal('fetch', fetchSimulado)

  return fetchSimulado
}

async function completarFormulario(usuario) {
  await usuario.type(
    screen.getByLabelText('Código'),
    'PAD001'
  )

  await usuario.type(
    screen.getByLabelText('Nombre'),
    'Mouse Pad Gamer'
  )

  await usuario.type(
    screen.getByLabelText('Descripción'),
    'Alfombrilla para mouse'
  )

  await usuario.type(
    screen.getByLabelText('Precio (CLP)'),
    '12000'
  )

  await usuario.type(
    screen.getByLabelText('Stock', { exact: true }),
    '15'
  )

  await usuario.type(
    screen.getByLabelText('Categoría'),
    'Accesorios'
  )
}

describe('Pruebas de AdminProductos', () => {
  beforeEach(() => {
    vi.restoreAllMocks()

    // Simula el desplazamiento del navegador en jsdom
    Element.prototype.scrollIntoView = vi.fn()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('muestra el título del panel de administración', async () => {
    // Arrange
    simularListado([])

    // Act
    render(<AdminProductos />)

    // Assert
    expect(
      screen.getByRole('heading', {
        name: 'Administración de productos',
      })
    ).toBeInTheDocument()

    expect(
      await screen.findByText('No hay productos registrados.')
    ).toBeInTheDocument()
  })

  it('muestra el mensaje de carga mientras espera la API', () => {
    // Arrange
    vi.stubGlobal(
      'fetch',
      vi.fn(() => new Promise(() => {}))
    )

    // Act
    render(<AdminProductos />)

    // Assert
    expect(
      screen.getByText('Cargando productos...')
    ).toBeInTheDocument()
  })

  it('muestra los productos recibidos del backend', async () => {
    // Arrange
    simularListado()

    // Act
    render(<AdminProductos />)

    // Assert
    expect(
      await screen.findByText('Mouse Gamer')
    ).toBeInTheDocument()

    expect(
      screen.getByText('Teclado Gamer')
    ).toBeInTheDocument()

    expect(
      screen.getByText('Audifonos Gamer')
    ).toBeInTheDocument()
  })

  it('identifica los estados de stock correctamente', async () => {
    // Arrange
    simularListado()

    // Act
    render(<AdminProductos />)

    const mouse = await screen.findByText('Mouse Gamer')
    const teclado = screen.getByText('Teclado Gamer')
    const audifonos = screen.getByText('Audifonos Gamer')

    // Assert
    expect(
      within(mouse.closest('tr')).getByText('Disponible')
    ).toBeInTheDocument()

    expect(
      within(teclado.closest('tr')).getByText('Stock crítico')
    ).toBeInTheDocument()

    expect(
      within(audifonos.closest('tr')).getByText('Sin stock')
    ).toBeInTheDocument()
  })

  it('muestra un error si falla la consulta de productos', async () => {
    // Arrange
    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(
        new Error('Error de conexión')
      )
    )

    // Act
    render(<AdminProductos />)

    // Assert
    expect(
      await screen.findByRole('alert')
    ).toHaveTextContent('Error de conexión')
  })

  it('impide enviar el formulario con campos obligatorios vacíos', async () => {
    // Arrange
    const usuario = userEvent.setup()
    const fetchSimulado = simularListado([])

    render(<AdminProductos />)

    await screen.findByText('No hay productos registrados.')

    const campoCodigo = screen.getByLabelText('Código')
    const campoNombre = screen.getByLabelText('Nombre')
    const campoCategoria = screen.getByLabelText('Categoría')

    // Act
    await usuario.click(
      screen.getByRole('button', {
        name: 'Crear producto',
      })
    )

    // Assert
    expect(campoCodigo).toBeRequired()
    expect(campoNombre).toBeRequired()
    expect(campoCategoria).toBeRequired()

    expect(campoCodigo).toBeInvalid()

    // Solo se ejecutó GET, no POST
    expect(fetchSimulado).toHaveBeenCalledTimes(1)
  })

  it('crea un producto enviando una solicitud POST', async () => {
    // Arrange
    const usuario = userEvent.setup()

    const fetchSimulado = vi.fn()
      .mockResolvedValueOnce(respuestaExitosa([]))
      .mockResolvedValueOnce(
        respuestaExitosa({
          mensaje: 'Producto creado',
        })
      )
      .mockResolvedValueOnce(respuestaExitosa([]))

    vi.stubGlobal('fetch', fetchSimulado)

    render(<AdminProductos />)

    await screen.findByText('No hay productos registrados.')

    // Act
    await completarFormulario(usuario)

    await usuario.click(
      screen.getByRole('button', {
        name: 'Crear producto',
      })
    )

    // Assert
    expect(
      await screen.findByRole('status')
    ).toHaveTextContent('Producto creado correctamente.')

    const llamadaPOST = fetchSimulado.mock.calls.find(
      ([, opciones]) => opciones?.method === 'POST'
    )

    expect(llamadaPOST).toBeDefined()
    expect(llamadaPOST[0]).toBe(API_URL)

    const datosEnviados = JSON.parse(
      llamadaPOST[1].body
    )

    expect(datosEnviados.nombre).toBe('Mouse Pad Gamer')
    expect(datosEnviados.precio).toBe(12000)
    expect(datosEnviados.stock).toBe(15)
  })

  it('carga los datos al editar y permite cancelar', async () => {
    // Arrange
    const usuario = userEvent.setup()
    simularListado([productosDePrueba[0]])

    render(<AdminProductos />)

    const mouse = await screen.findByText('Mouse Gamer')

    // Act
    await usuario.click(
      within(mouse.closest('tr')).getByRole('button', {
        name: 'Editar',
      })
    )

    // Assert
    expect(
      screen.getByRole('heading', {
        name: 'Editar producto',
      })
    ).toBeInTheDocument()

    expect(
      screen.getByLabelText('Nombre')
    ).toHaveValue('Mouse Gamer')

    // Act
    await usuario.click(
      screen.getByRole('button', {
        name: 'Cancelar edición',
      })
    )

    // Assert
    expect(
      screen.getByRole('heading', {
        name: 'Agregar nuevo producto',
      })
    ).toBeInTheDocument()
  })

  it('actualiza un producto mediante PUT', async () => {
    // Arrange
    const usuario = userEvent.setup()

    const fetchSimulado = vi.fn()
      .mockResolvedValueOnce(
        respuestaExitosa([productosDePrueba[0]])
      )
      .mockResolvedValueOnce(
        respuestaExitosa({ mensaje: 'Actualizado' })
      )
      .mockResolvedValueOnce(
        respuestaExitosa([productosDePrueba[0]])
      )

    vi.stubGlobal('fetch', fetchSimulado)

    render(<AdminProductos />)

    const mouse = await screen.findByText('Mouse Gamer')

    // Act
    await usuario.click(
      within(mouse.closest('tr')).getByRole('button', {
        name: 'Editar',
      })
    )

    const campoNombre = screen.getByLabelText('Nombre')

    await usuario.clear(campoNombre)
    await usuario.type(campoNombre, 'Mouse Gamer Pro')

    await usuario.click(
      screen.getByRole('button', {
        name: 'Guardar cambios',
      })
    )

    // Assert
    expect(
      await screen.findByRole('status')
    ).toHaveTextContent('Producto actualizado correctamente.')

    const llamadaPUT = fetchSimulado.mock.calls.find(
      ([, opciones]) => opciones?.method === 'PUT'
    )

    expect(llamadaPUT).toBeDefined()
    expect(llamadaPUT[0]).toBe(`${API_URL}/1`)

    const datosEnviados = JSON.parse(
      llamadaPUT[1].body
    )

    expect(datosEnviados.nombre).toBe('Mouse Gamer Pro')
  })

  it('elimina un producto confirmado por el usuario', async () => {
    // Arrange
    const usuario = userEvent.setup()

    const confirmar = vi.spyOn(window, 'confirm')
      .mockReturnValue(true)

    const fetchSimulado = vi.fn()
      .mockResolvedValueOnce(
        respuestaExitosa([productosDePrueba[0]])
      )
      .mockResolvedValueOnce(
        respuestaExitosa({ mensaje: 'Eliminado' })
      )
      .mockResolvedValueOnce(respuestaExitosa([]))

    vi.stubGlobal('fetch', fetchSimulado)

    render(<AdminProductos />)

    const mouse = await screen.findByText('Mouse Gamer')

    // Act
    await usuario.click(
      within(mouse.closest('tr')).getByRole('button', {
        name: 'Eliminar',
      })
    )

    // Assert
    expect(confirmar).toHaveBeenCalled()

    expect(
      await screen.findByRole('status')
    ).toHaveTextContent('Producto eliminado correctamente.')

    const llamadaDELETE = fetchSimulado.mock.calls.find(
      ([, opciones]) => opciones?.method === 'DELETE'
    )

    expect(llamadaDELETE).toBeDefined()
    expect(llamadaDELETE[0]).toBe(`${API_URL}/1`)
  })
})
