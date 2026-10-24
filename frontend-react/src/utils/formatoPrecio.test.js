
import { describe, it, expect } from 'vitest'
import { formatearPrecio } from './formatoPrecio.js'

describe('Pruebas del formato de precios', () => {
  it('formatea un precio en pesos chilenos', () => {
    // Arrange
    const precio = 20000

    // Act
    const resultado = formatearPrecio(precio)

    // Assert
    expect(resultado).toContain('20.000')
    expect(resultado).toContain('$')
  })

  it('formatea correctamente un precio de un millón', () => {
    // Arrange
    const precio = 1000000

    // Act
    const resultado = formatearPrecio(precio)

    // Assert
    expect(resultado).toContain('1.000.000')
  })

  it('convierte un precio recibido como texto', () => {
    // Arrange
    const precio = '35000'

    // Act
    const resultado = formatearPrecio(precio)

    // Assert
    expect(resultado).toContain('35.000')
  })

  it('formatea correctamente el valor cero', () => {
    // Arrange
    const precio = 0

    // Act
    const resultado = formatearPrecio(precio)

    // Assert
    expect(resultado).toContain('$')
    expect(resultado).toContain('0')
  })

  it('redondea los precios sin mostrar decimales', () => {
    // Arrange
    const precio = 19999.75

    // Act
    const resultado = formatearPrecio(precio)

    // Assert
    expect(resultado).toContain('20.000')
    expect(resultado).not.toContain(',75')
  })
})
