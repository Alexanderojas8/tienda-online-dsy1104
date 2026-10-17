
import {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react'

const CarritoContext = createContext(null)

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState(() => {
    try {
      const guardado = localStorage.getItem('carrito-react')
      return guardado ? JSON.parse(guardado) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('carrito-react', JSON.stringify(carrito))
  }, [carrito])

  function agregarProducto(producto) {
    setCarrito((anterior) => {
      const existente = anterior.find(
        (item) => item.id === producto.id
      )

      const cantidadActual = existente?.cantidad || 0

      if (cantidadActual >= Number(producto.stock)) {
        return anterior
      }

      if (existente) {
        return anterior.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      }

      return [...anterior, { ...producto, cantidad: 1 }]
    })
  }

  // Aumentar o disminuir la cantidad de un producto
  function cambiarCantidad(id, cambio) {
    setCarrito((anterior) =>
      anterior
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
    )
  }

  function eliminarProducto(id) {
    setCarrito((anterior) =>
      anterior.filter((item) => item.id !== id)
    )
  }

  function vaciarCarrito() {
    setCarrito([])
  }

  const cantidadTotal = carrito.reduce(
    (total, item) => total + item.cantidad,
    0
  )

  const precioTotal = carrito.reduce(
    (total, item) =>
      total + Number(item.precio) * item.cantidad,
    0
  )

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarProducto,
        cambiarCantidad,
        eliminarProducto,
        vaciarCarrito,
        cantidadTotal,
        precioTotal,
      }}
    >
      {children}
    </CarritoContext.Provider>
  )
}

export function useCarrito() {
  const contexto = useContext(CarritoContext)

  if (!contexto) {
    throw new Error(
      'useCarrito debe utilizarse dentro de CarritoProvider'
    )
  }

  return contexto
}
