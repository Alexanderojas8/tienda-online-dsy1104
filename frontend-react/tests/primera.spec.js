
describe('Pruebas iniciales de la tienda', () => {
  it('debe sumar correctamente dos cantidades', () => {
    const cantidadInicial = 2
    const cantidadAgregada = 3

    const resultado = cantidadInicial + cantidadAgregada

    expect(resultado).toBe(5)
  })

  it('debe calcular correctamente el subtotal', () => {
    const precio = 20000
    const cantidad = 2

    const subtotal = precio * cantidad

    expect(subtotal).toBe(40000)
  })
})
