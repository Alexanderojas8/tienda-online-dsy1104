
import { useState } from 'react'
import { useCarrito } from '../context/CarritoContext'

const formatearPrecio = (precio) =>
  new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(Number(precio))

const regiones = {
  'Región Metropolitana': [
    'Santiago',
    'Maipú',
    'Puente Alto',
    'La Florida',
    'San Joaquín',
    'Providencia',
    'Las Condes',
  ],
  'Valparaíso': [
    'Valparaíso',
    'Viña del Mar',
    'Quilpué',
  ],
  'Biobío': [
    'Concepción',
    'Talcahuano',
    'Los Ángeles',
  ],
}

const datosIniciales = {
  nombre: '',
  correo: '',
  telefono: '',
  direccion: '',
  region: '',
  comuna: '',
}

function Checkout() {
  const { carrito, cantidadTotal, precioTotal, vaciarCarrito } =
    useCarrito()

  const [datos, setDatos] = useState(datosIniciales)
  const [errores, setErrores] = useState({})
  const [compraExitosa, setCompraExitosa] = useState(false)

  function actualizarCampo(evento) {
    const { name, value } = evento.target

    setDatos((anterior) => ({
      ...anterior,
      [name]: value,
      ...(name === 'region' ? { comuna: '' } : {}),
    }))

    setErrores((anterior) => ({
      ...anterior,
      [name]: '',
    }))
  }

  function validarFormulario() {
    const nuevosErrores = {}

    if (datos.nombre.trim().length < 3) {
      nuevosErrores.nombre = 'Ingresa un nombre válido.'
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.correo.trim())) {
      nuevosErrores.correo = 'Ingresa un correo válido.'
    }

    if (!/^\+?[\d\s-]{8,15}$/.test(datos.telefono.trim())) {
      nuevosErrores.telefono = 'Ingresa un teléfono válido.'
    }

    if (datos.direccion.trim().length < 5) {
      nuevosErrores.direccion = 'Ingresa una dirección válida.'
    }

    if (!datos.region) {
      nuevosErrores.region = 'Selecciona una región.'
    }

    if (!datos.comuna) {
      nuevosErrores.comuna = 'Selecciona una comuna.'
    }

    setErrores(nuevosErrores)

    return Object.keys(nuevosErrores).length === 0
  }

  function confirmarCompra(evento) {
    evento.preventDefault()

    if (carrito.length === 0) return
    if (!validarFormulario()) return

    setCompraExitosa(true)
    vaciarCarrito()
    setDatos(datosIniciales)
  }

  if (compraExitosa) {
    return (
      <section id="checkout" className="container py-5">
        <div className="alert alert-success text-center p-5">
          <h2 className="fw-bold">¡Compra confirmada!</h2>
          <p>
            Tu pedido de demostración fue procesado correctamente.
          </p>
          <p className="small">
            No se realizó ningún cobro real.
          </p>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => setCompraExitosa(false)}
          >
            Volver a comprar
          </button>
        </div>
      </section>
    )
  }

  return (
    <section id="checkout" className="container py-5">
      <h2 className="fw-bold mb-4">
        Finalizar compra
      </h2>

      {carrito.length === 0 ? (
        <div className="alert alert-info">
          Tu carrito está vacío. Agrega productos antes de comprar.
        </div>
      ) : (
        <div className="row g-4">
          <div className="col-lg-7">
            <form
              onSubmit={confirmarCompra}
              noValidate
              className="card shadow-sm p-4"
            >
              <h4 className="mb-4">Datos de contacto y envío</h4>

              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">
                  Nombre completo
                </label>
                <input
                  id="nombre"
                  type="text"
                  name="nombre"
                  className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
                  value={datos.nombre}
                  onChange={actualizarCampo}
                />
                <div className="invalid-feedback">
                  {errores.nombre}
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="correo" className="form-label">
                  Correo electrónico
                </label>
                <input
                  id="correo"
                  type="email"
                  name="correo"
                  className={`form-control ${errores.correo ? 'is-invalid' : ''}`}
                  value={datos.correo}
                  onChange={actualizarCampo}
                />
                <div className="invalid-feedback">
                  {errores.correo}
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="telefono" className="form-label">
                  Teléfono
                </label>
                <input
                  id="telefono"
                  type="tel"
                  name="telefono"
                  className={`form-control ${errores.telefono ? 'is-invalid' : ''}`}
                  value={datos.telefono}
                  onChange={actualizarCampo}
                  placeholder="+56912345678"
                />
                <div className="invalid-feedback">
                  {errores.telefono}
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="direccion" className="form-label">
                  Dirección de envío
                </label>
                <input
                  id="direccion"
                  type="text"
                  name="direccion"
                  className={`form-control ${errores.direccion ? 'is-invalid' : ''}`}
                  value={datos.direccion}
                  onChange={actualizarCampo}
                />
                <div className="invalid-feedback">
                  {errores.direccion}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="region" className="form-label">
                    Región
                  </label>
                  <select
                    id="region"
                    name="region"
                    className={`form-select ${errores.region ? 'is-invalid' : ''}`}
                    value={datos.region}
                    onChange={actualizarCampo}
                  >
                    <option value="">Selecciona una región</option>
                    {Object.keys(regiones).map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                  <div className="invalid-feedback">
                    {errores.region}
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="comuna" className="form-label">
                    Comuna
                  </label>
                  <select
                    id="comuna"
                    name="comuna"
                    className={`form-select ${errores.comuna ? 'is-invalid' : ''}`}
                    value={datos.comuna}
                    onChange={actualizarCampo}
                    disabled={!datos.region}
                  >
                    <option value="">Selecciona una comuna</option>
                    {(regiones[datos.region] || []).map((comuna) => (
                      <option key={comuna} value={comuna}>
                        {comuna}
                      </option>
                    ))}
                  </select>
                  <div className="invalid-feedback">
                    {errores.comuna}
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-success btn-lg">
                Confirmar compra
              </button>
            </form>
          </div>

          <div className="col-lg-5">
            <div className="card shadow-sm p-4">
              <h4>Resumen del pedido</h4>
              <hr />

              {carrito.map((producto) => (
                <div
                  key={producto.id}
                  className="d-flex justify-content-between mb-2"
                >
                  <span>
                    {producto.nombre} × {producto.cantidad}
                  </span>
                  <span>
                    {formatearPrecio(
                      producto.precio * producto.cantidad
                    )}
                  </span>
                </div>
              ))}

              <hr />
              <p>Unidades: {cantidadTotal}</p>
              <h4 className="text-primary fw-bold">
                Total: {formatearPrecio(precioTotal)}
              </h4>
              <p className="text-muted small mb-0">
                Compra simulada para fines académicos.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Checkout
