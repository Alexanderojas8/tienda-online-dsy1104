
import { useEffect, useState } from 'react'
import { useCarrito } from '../context/CarritoContext'

const API_URL = 'http://localhost:3000/api/productos'

const imagenesRespaldo = {
  1: '/img/mouse.jpg.png',
  2: '/img/teclado.jpg.png',
  3: '/img/audifonos.jpg.png',
  4: '/img/monitor.jpg.png',
}

const formatearPrecio = (precio) =>
  new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(Number(precio))

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

          const stockDisponible = Number(producto.stock)

          const sinStock = stockDisponible <= 0

          const alcanzoLimite =
            cantidadEnCarrito >= stockDisponible

          return (
            <div
              className="col-12 col-sm-6 col-lg-4"
              key={producto.id}
            >
              <div className="card h-100 shadow-sm">
                <img
                  src={
                    producto.imagen ||
                    imagenesRespaldo[producto.id] ||
                    '/img/mouse.jpg.png'
                  }
                  className="card-img-top"
                  alt={producto.nombre}
                  style={{
                    height: '220px',
                    objectFit: 'contain',
                    padding: '15px',
                  }}
                />

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">
                    {producto.nombre}
                  </h5>

                  <p className="card-text text-secondary">
                    {producto.descripcion}
                  </p>

                  <p className="fw-bold text-primary fs-5">
                    {formatearPrecio(producto.precio)}
                  </p>

                  <p className="small">
                    Stock disponible: {producto.stock}
                  </p>

                  {cantidadEnCarrito > 0 && (
                    <p className="small text-success fw-semibold">
                      En el carrito: {cantidadEnCarrito}
                    </p>
                  )}

                  <button
                    type="button"
                    className="btn btn-primary mt-auto"
                    onClick={() => agregarProducto(producto)}
                    disabled={sinStock || alcanzoLimite}
                  >
                    {sinStock
                      ? 'Sin stock'
                      : alcanzoLimite
                        ? 'Máximo disponible'
                        : 'Agregar al carrito'}
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Productos
