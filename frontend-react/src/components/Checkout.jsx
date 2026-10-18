
import { useState } from 'react'
import { useCarrito } from '../context/CarritoContext'
import { useNavigate } from 'react-router-dom'

const API_PEDIDOS = 'http://localhost:3000/api/pedidos'

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
  const navigate = useNavigate()
  const {
    carrito,
    cantidadTotal,
    precioTotal,
    vaciarCarrito,
  } = useCarrito()

  const [datos, setDatos] = useState(datosIniciales)
  const [errores, setErrores] = useState({})
  const [compraExitosa, setCompraExitosa] = useState(false)
  const [pedidoConfirmado, setPedidoConfirmado] = useState(null)
  const [procesando, setProcesando] = useState(false)
  const [errorServidor, setErrorServidor] = useState('')

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
      ...(name === 'region' ? { comuna: '' } : {}),
    }))

    setErrorServidor('')
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

  async function confirmarCompra(evento) {
    evento.preventDefault()

    if (procesando || carrito.length === 0) return
    if (!validarFormulario()) return

    setProcesando(true)
    setErrorServidor('')

    try {
      const respuesta = await fetch(API_PEDIDOS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cliente: {
            nombre: datos.nombre.trim(),
            correo: datos.correo.trim(),
            telefono: datos.telefono.trim(),
            direccion: datos.direccion.trim(),
            region: datos.region,
            comuna: datos.comuna,
          },
          productos: carrito.map((producto) => ({
            id: producto.id,
            cantidad: producto.cantidad,
          })),
        }),
      })

      const resultado = await respuesta.json()

      if (!respuesta.ok) {
        throw new Error(
          resultado.mensaje || 'No se pudo registrar el pedido'
        )
      }

      setPedidoConfirmado(resultado.pedido)
      setCompraExitosa(true)

      vaciarCarrito()
      setDatos(datosIniciales)
      setErrores({})
    } catch (error) {
      setErrorServidor(
        error.message || 'Ocurrió un error al procesar la compra.'
      )
    } finally {
      setProcesando(false)
    }
  }

  function volverAComprar() {
  setCompraExitosa(false)
  setPedidoConfirmado(null)
  setErrorServidor('')
  navigate('/productos')
}

  if (compraExitosa && pedidoConfirmado) {
    return (
      <section id="checkout" className="container py-5">
        <div className="alert alert-success text-center p-5">
          <h2 className="fw-bold mb-3">
            ¡Compra confirmada!
          </h2>

          <p className="fs-5">
            Tu pedido N° <strong>{pedidoConfirmado.id}</strong> fue
            registrado correctamente.
          </p>

          <p>
            Fecha:{' '}
            {new Date(pedidoConfirmado.fecha).toLocaleString('es-CL')}
          </p>

          <h4 className="fw-bold">
            Total: {formatearPrecio(pedidoConfirmado.total)}
          </h4>

          <p className="mt-3">
            El pedido quedó guardado en nuestro sistema.
          </p>

          <p className="small">
            Esta es una compra académica simulada.
            No se realizó ningún cobro real.
          </p>

          <button
            type="button"
            className="btn btn-success mt-3"
            onClick={volverAComprar}
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

      {errorServidor && (
        <div className="alert alert-danger" role="alert">
          <strong>No se pudo completar la compra:</strong>{' '}
          {errorServidor}
        </div>
      )}

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
              <h4 className="mb-4">
                Datos de contacto y envío
              </h4>

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
                  disabled={procesando}
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
                  disabled={procesando}
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
                  disabled={procesando}
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
                  disabled={procesando}
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
                    disabled={procesando}
                  >
                    <option value="">
                      Selecciona una región
                    </option>

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
                    disabled={!datos.region || procesando}
                  >
                    <option value="">
                      Selecciona una comuna
                    </option>

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

              <button
                type="submit"
                className="btn btn-success btn-lg"
                disabled={procesando}
              >
                {procesando
                  ? 'Procesando pedido...'
                  : 'Confirmar compra'}
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
                  className="d-flex justify-content-between mb-2 gap-3"
                >
                  <span>
                    {producto.nombre} × {producto.cantidad}
                  </span>

                  <span>
                    {formatearPrecio(
                      Number(producto.precio) * producto.cantidad
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
                El precio y stock definitivos se validarán
                en el servidor al confirmar el pedido.
              </p>

              <p className="text-muted small mt-2">
                Compra simulada para fines académicos.
                No se procesan pagos reales.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Checkout
