    
import { formatearPrecio } from '../src/utils/formatoPrecio.js'

describe('Formato de precios de la tienda', () => {
  it('debe mostrar un precio en pesos chilenos', () => {
    const resultado = formatearPrecio(20000)

    expect(resultado).toContain('20.000')
  })

  it('debe formatear correctamente un precio de 39990', () => {
    const resultado = formatearPrecio(39990)

    expect(resultado).toContain('39.990')
  })

  it('debe aceptar precios recibidos como texto', () => {
    const resultado = formatearPrecio('15000')

    expect(resultado).toContain('15.000')
  })

  it('debe formatear correctamente el valor cero', () => {
    const resultado = formatearPrecio(0)

    expect(resultado).toContain('0')
  })
})
