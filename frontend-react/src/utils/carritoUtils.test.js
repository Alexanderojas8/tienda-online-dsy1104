
import { describe, it, expect } from 'vitest'

import {
  agregarAlCarrito,
  modificarCantidad,
  quitarProducto,
  calcularCantidadTotal,
  calcularPrecioTotal,
} from './carritoUtils.js'

describe('Pruebas unitarias del carrito', () => {
  const mouse = {
    id: 1,
    nombre: 'Mouse Gamer',
    precio: 20000,
    stock: 3,
  }

  const teclado = {
    id: 2,
    nombre: 'Teclado Gamer',
    precio: 30000,
    stock: 5,
  }

  it('agrega un producto nuevo al carrito', () => {
    // Arrange
    const carrito = []

    // Act
    const resultado = agregarAlCarrito(carrito, mouse)

    // Assert
    expect(resultado).toHaveLength(1)
    expect(resultado[0].nombre).toBe('Mouse Gamer')
    expect(resultado[0].cantidad).toBe(1)
  })

  it('aumenta la cantidad de un producto existente', () => {
    // Arrange
    const carrito = [{ ...mouse, cantidad: 1 }]

    // Act
    const resultado = agregarAlCarrito(carrito, mouse)

    // Assert
    expect(resultado[0].cantidad).toBe(2)
  })

  it('no permite agregar más productos que el stock', () => {
    // Arrange
    const carrito = [{ ...mouse, cantidad: 3 }]

    // Act
    const resultado = agregarAlCarrito(carrito, mouse)

    // Assert
    expect(resultado[0].cantidad).toBe(3)
  })

  it('no agrega un producto sin stock', () => {
    // Arrange
    const productoSinStock = { ...mouse, stock: 0 }

    // Act
    const resultado = agregarAlCarrito([], productoSinStock)

    // Assert
    expect(resultado).toHaveLength(0)
  })

  it('permite aumentar la cantidad de un producto', () => {
    // Arrange
    const carrito = [{ ...mouse, cantidad: 1 }]

    // Act
    const resultado = modificarCantidad(carrito, 1, 1)

    // Assert
    expect(resultado[0].cantidad).toBe(2)
  })

  it('no permite superar el stock al modificar la cantidad', () => {
    // Arrange
    const carrito = [{ ...mouse, cantidad: 3 }]

    // Act
    const resultado = modificarCantidad(carrito, 1, 1)

    // Assert
    expect(resultado[0].cantidad).toBe(3)
  })

  it('elimina el producto si su cantidad llega a cero', () => {
    // Arrange
    const carrito = [{ ...mouse, cantidad: 1 }]

    // Act
    const resultado = modificarCantidad(carrito, 1, -1)

    // Assert
    expect(resultado).toHaveLength(0)
  })

  it('mantiene los demás productos al modificar uno', () => {
    // Arrange
    const carrito = [
      { ...mouse, cantidad: 1 },
      { ...teclado, cantidad: 2 },
    ]

    // Act
    const resultado = modificarCantidad(carrito, 1, 1)

    // Assert
    expect(resultado[0].cantidad).toBe(2)
    expect(resultado[1].cantidad).toBe(2)
  })

  it('quita un producto del carrito por su ID', () => {
    // Arrange
    const carrito = [
      { ...mouse, cantidad: 1 },
      { ...teclado, cantidad: 1 },
    ]

    // Act
    const resultado = quitarProducto(carrito, 1)

    // Assert
    expect(resultado).toHaveLength(1)
    expect(resultado[0].id).toBe(2)
  })

  it('calcula la cantidad total de productos', () => {
    // Arrange
    const carrito = [
      { ...mouse, cantidad: 2 },
      { ...teclado, cantidad: 3 },
    ]

    // Act
    const resultado = calcularCantidadTotal(carrito)

    // Assert
    expect(resultado).toBe(5)
  })

  it('calcula el precio total del carrito', () => {
    // Arrange
    const carrito = [
      { ...mouse, cantidad: 2 },
      { ...teclado, cantidad: 1 },
    ]

    // Act
    const resultado = calcularPrecioTotal(carrito)

    // Assert
    expect(resultado).toBe(70000)
  })

  it('devuelve cero cuando el carrito está vacío', () => {
    // Arrange
    const carrito = []

    // Act
    const cantidad = calcularCantidadTotal(carrito)
    const precio = calcularPrecioTotal(carrito)

    // Assert
    expect(cantidad).toBe(0)
    expect(precio).toBe(0)
  })
})
