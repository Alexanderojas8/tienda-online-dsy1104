
export function agregarAlCarrito(carrito, producto) {
  const existente = carrito.find(
    (item) => item.id === producto.id
  )

  const cantidadActual = existente?.cantidad || 0

  if (cantidadActual >= Number(producto.stock)) {
    return carrito
  }

  if (existente) {
    return carrito.map((item) =>
      item.id === producto.id
        ? { ...item, cantidad: item.cantidad + 1 }
        : item
    )
  }

  return [...carrito, { ...producto, cantidad: 1 }]
}

export function modificarCantidad(carrito, id, cambio) {
  return carrito
    .map((item) => {
      if (item.id !== id) {
        return item
      }

      const nuevaCantidad = item.cantidad + cambio

      if (nuevaCantidad > Number(item.stock)) {
        return item
      }

      return {
        ...item,
        cantidad: nuevaCantidad,
      }
    })
    .filter((item) => item.cantidad > 0)
}

export function quitarProducto(carrito, id) {
  return carrito.filter((item) => item.id !== id)
}

export function calcularCantidadTotal(carrito) {
  return carrito.reduce(
    (total, item) => total + item.cantidad,
    0
  )
}

export function calcularPrecioTotal(carrito) {
  return carrito.reduce(
    (total, item) =>
      total + Number(item.precio) * item.cantidad,
    0
  )
}
