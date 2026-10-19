
import {
  agregarAlCarrito,
  modificarCantidad,
  quitarProducto,
  calcularCantidadTotal,
  calcularPrecioTotal,
} from '../src/utils/carritoUtils.js'

describe('Pruebas unitarias del carrito', () => {
  const mouse = {
    id: 1,
    nombre: 'Mouse Gamer',
    precio: 20000,
    stock: 5,
  }

  const teclado = {
    id: 2,
    nombre: 'Teclado Mecánico',
    precio: 39990,
    stock: 3,
  }

  it('debe agregar un producto al carrito', () => {
    const resultado = agregarAlCarrito([], mouse)

    expect(resultado.length).toBe(1)
    expect(resultado[0].cantidad).toBe(1)
  })

  it('debe aumentar la cantidad de un producto existente', () => {
    const carrito = [{ ...mouse, cantidad: 1 }]
    const resultado = agregarAlCarrito(carrito, mouse)

    expect(resultado[0].cantidad).toBe(2)
  })

  it('no debe superar el stock disponible al agregar', () => {
    const carrito = [{ ...mouse, cantidad: 5 }]
    const resultado = agregarAlCarrito(carrito, mouse)

    expect(resultado[0].cantidad).toBe(5)
  })

  it('debe aumentar la cantidad usando el botón más', () => {
    const carrito = [{ ...mouse, cantidad: 1 }]
    const resultado = modificarCantidad(carrito, 1, 1)

    expect(resultado[0].cantidad).toBe(2)
  })

  it('debe disminuir la cantidad usando el botón menos', () => {
    const carrito = [{ ...mouse, cantidad: 3 }]
    const resultado = modificarCantidad(carrito, 1, -1)

    expect(resultado[0].cantidad).toBe(2)
  })

  it('debe quitar un producto cuando su cantidad llega a cero', () => {
    const carrito = [{ ...mouse, cantidad: 1 }]
    const resultado = modificarCantidad(carrito, 1, -1)

    expect(resultado.length).toBe(0)
  })

  it('no debe superar el stock al aumentar cantidad', () => {
    const carrito = [{ ...mouse, cantidad: 5 }]
    const resultado = modificarCantidad(carrito, 1, 1)

    expect(resultado[0].cantidad).toBe(5)
  })

  it('debe eliminar un producto seleccionado', () => {
    const carrito = [
      { ...mouse, cantidad: 1 },
      { ...teclado, cantidad: 1 },
    ]

    const resultado = quitarProducto(carrito, 1)

    expect(resultado.length).toBe(1)
    expect(resultado[0].id).toBe(2)
  })

  it('debe calcular la cantidad total de unidades', () => {
    const carrito = [
      { ...mouse, cantidad: 2 },
      { ...teclado, cantidad: 3 },
    ]

    expect(calcularCantidadTotal(carrito)).toBe(5)
  })

  it('debe calcular correctamente el precio total', () => {
    const carrito = [
      { ...mouse, cantidad: 2 },
      { ...teclado, cantidad: 1 },
    ]

    expect(calcularPrecioTotal(carrito)).toBe(79990)
  })
})
