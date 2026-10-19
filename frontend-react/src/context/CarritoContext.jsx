
import {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react'

import {
  agregarAlCarrito,
  modificarCantidad,
  quitarProducto,
  calcularCantidadTotal,
  calcularPrecioTotal,
} from '../utils/carritoUtils'

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
    localStorage.setItem(
      'carrito-react',
      JSON.stringify(carrito)
    )
  }, [carrito])

  function agregarProducto(producto) {
    setCarrito((anterior) =>
      agregarAlCarrito(anterior, producto)
    )
  }

  function cambiarCantidad(id, cambio) {
    setCarrito((anterior) =>
      modificarCantidad(anterior, id, cambio)
    )
  }

  function eliminarProducto(id) {
    setCarrito((anterior) =>
      quitarProducto(anterior, id)
    )
  }

  function vaciarCarrito() {
    setCarrito([])
  }

  const cantidadTotal = calcularCantidadTotal(carrito)
  const precioTotal = calcularPrecioTotal(carrito)

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
