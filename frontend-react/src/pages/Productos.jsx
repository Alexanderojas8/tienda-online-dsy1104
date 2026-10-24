
import { useEffect, useState } from 'react'
import { useCarrito } from '../context/CarritoContext'
import ProductoCard from '../components/ProductoCard'

const API_URL = 'http://localhost:3000/api/productos'

function Productos() {
  const { carrito, agregarProducto } = useCarrito()

  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function cargarProductos() {
      try {
        const respuesta = await fetch(API_URL)

        if (!respuesta.ok) {
          throw new Error('No se pudieron cargar los productos')
        }

        const datos = await respuesta.json()
        setProductos(datos)
      } catch (err) {
        setError(err.message)
      } finally {
        setCargando(false)
      }
    }

    cargarProductos()
  }, [])

  if (cargando) {
    return (
      <p className="text-center py-5">
        Cargando productos...
      </p>
    )
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">
          {error}. Comprueba que el backend esté encendido.
        </div>
      </div>
    )
  }

  return (
    <section id="productos" className="container py-5">
      <h2 className="text-center fw-bold mb-4">
        Nuestros productos
      </h2>

      <div className="row g-4">
        {productos.map((producto) => {
          const cantidadEnCarrito =
            carrito.find((item) => item.id === producto.id)
              ?.cantidad || 0

          return (
            <ProductoCard
              key={producto.id}
              producto={producto}
              cantidadEnCarrito={cantidadEnCarrito}
              onAgregar={agregarProducto}
            />
          )
        })}
      </div>
    </section>
  )
}

export default Productos
