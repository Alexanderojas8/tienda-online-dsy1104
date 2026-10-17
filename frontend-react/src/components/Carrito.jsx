
import { useCarrito } from '../context/CarritoContext'

const formatearPrecio = (precio) =>
  new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(Number(precio))

function Carrito() {
  const {
    carrito,
    cambiarCantidad,
    eliminarProducto,
    vaciarCarrito,
    cantidadTotal,
    precioTotal,
  } = useCarrito()

  return (
    <section id="carrito" className="container py-5">
      <h2 className="fw-bold mb-4">
        🛒 Mi carrito de compras
      </h2>

      {carrito.length === 0 ? (
        <div className="alert alert-info">
          Tu carrito está vacío. Agrega productos para comenzar.
        </div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Producto</th>
                  <th>Precio unitario</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                  <th>Acción</th>
                </tr>
              </thead>

              <tbody>
                {carrito.map((producto) => (
                  <tr key={producto.id}>
                    <td>{producto.nombre}</td>

                    <td>
                      {formatearPrecio(producto.precio)}
                    </td>

                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <button
                          type="button"
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() =>
                            cambiarCantidad(producto.id, -1)
                          }
                          aria-label={`Disminuir cantidad de ${producto.nombre}`}
                        >
                          −
                        </button>

                        <span className="fw-bold">
                          {producto.cantidad}
                        </span>

                        <button
                          type="button"
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() =>
                            cambiarCantidad(producto.id, 1)
                          }
                          disabled={
                            producto.cantidad >= Number(producto.stock)
                          }
                          aria-label={`Aumentar cantidad de ${producto.nombre}`}
                        >
                          +
                        </button>
                      </div>
                    </td>

                    <td>
                      {formatearPrecio(
                        Number(producto.precio) * producto.cantidad
                      )}
                    </td>

                    <td>
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={() =>
                          eliminarProducto(producto.id)
                        }
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card shadow-sm mt-4">
            <div className="card-body">
              <p className="mb-2">
                Total de unidades:{' '}
                <strong>{cantidadTotal}</strong>
              </p>

              <h3 className="fw-bold text-primary">
                Total: {formatearPrecio(precioTotal)}
              </h3>

              <button
                type="button"
                className="btn btn-outline-danger mt-3"
                onClick={vaciarCarrito}
              >
                Vaciar carrito
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  )
}

export default Carrito
