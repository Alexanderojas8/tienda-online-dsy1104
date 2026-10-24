
const imagenesRespaldo = {
  1: '/img/mouse.jpg.png',
  2: '/img/teclado.jpg.png',
  3: '/img/audifonos.jpg.png',
  4: '/img/monitor.jpg.png',
}

function ProductoCard({
  producto,
  cantidadEnCarrito,
  onAgregar,
}) {
  const stockDisponible = Number(producto.stock)

  const sinStock = stockDisponible <= 0

  const alcanzoLimite =
    cantidadEnCarrito >= stockDisponible

  const precioFormateado = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(Number(producto.precio))

  const imagen =
    producto.imagen ||
    imagenesRespaldo[producto.id] ||
    '/img/mouse.jpg.png'

  return (
    <div className="col-12 col-sm-6 col-lg-4">
      <div className="card h-100 shadow-sm">
        <img
          src={imagen}
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
            {precioFormateado}
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
            onClick={() => onAgregar(producto)}
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
}

export default ProductoCard
