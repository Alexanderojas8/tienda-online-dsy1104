
import { useEffect, useRef, useState } from 'react'

const API_URL = 'http://localhost:3000/api/productos'
const MAX_IMAGEN_MB = 2
const MAX_IMAGEN_BYTES = MAX_IMAGEN_MB * 1024 * 1024

const formularioInicial = {
  codigo: '',
  nombre: '',
  descripcion: '',
  precio: '',
  stock: '',
  stockCritico: '5',
  categoria: '',
  imagen: '',
}

const formatearPrecio = (precio) =>
  new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(Number(precio))

function AdminProductos() {
  const [productos, setProductos] = useState([])
  const [formulario, setFormulario] = useState(formularioInicial)
  const [productoEditando, setProductoEditando] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [guardando, setGuardando] = useState(false)
  const [procesandoImagen, setProcesandoImagen] = useState(false)
  const [arrastrando, setArrastrando] = useState(false)
  const [nombreImagen, setNombreImagen] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState('')

  const inputImagenRef = useRef(null)

  async function cargarProductos() {
    try {
      setCargando(true)

      const respuesta = await fetch(API_URL)

      if (!respuesta.ok) {
        throw new Error('No se pudieron cargar los productos')
      }

      const datos = await respuesta.json()
      setProductos(datos)
      setError('')
    } catch (err) {
      setError(err.message)
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    cargarProductos()
  }, [])

  function actualizarCampo(evento) {
    const { name, value } = evento.target

    setFormulario((anterior) => ({
      ...anterior,
      [name]: value,
    }))
  }

  function limpiarFormulario() {
    setFormulario({ ...formularioInicial })
    setProductoEditando(null)
    setNombreImagen('')

    if (inputImagenRef.current) {
      inputImagenRef.current.value = ''
    }
  }

  function editarProducto(producto) {
    setProductoEditando(producto.id)

    setFormulario({
      codigo: producto.codigo || '',
      nombre: producto.nombre || '',
      descripcion: producto.descripcion || '',
      precio: String(producto.precio ?? ''),
      stock: String(producto.stock ?? ''),
      stockCritico: String(producto.stockCritico ?? 5),
      categoria: producto.categoria || '',
      imagen: producto.imagen || '',
    })

    setNombreImagen('')
    setMensaje('')
    setError('')

    document.getElementById('formulario-producto')?.scrollIntoView({
      behavior: 'smooth',
    })
  }

  function validarImagen(archivo) {
    if (!archivo) {
      throw new Error('Selecciona una imagen.')
    }

    const formatosPermitidos = [
      'image/jpeg',
      'image/png',
      'image/webp',
    ]

    if (!formatosPermitidos.includes(archivo.type)) {
      throw new Error(
        'Formato no permitido. Usa JPG, PNG o WEBP.'
      )
    }

    if (archivo.size > MAX_IMAGEN_BYTES) {
      throw new Error(
        `La imagen no puede superar ${MAX_IMAGEN_MB} MB.`
      )
    }
  }

  function leerImagen(archivo) {
    return new Promise((resolve, reject) => {
      const lector = new FileReader()

      lector.onload = () => resolve(lector.result)

      lector.onerror = () =>
        reject(new Error('No se pudo leer la imagen.'))

      lector.readAsDataURL(archivo)
    })
  }

  async function procesarArchivoImagen(archivo) {
    if (!archivo) return

    setError('')
    setMensaje('')

    try {
      setProcesandoImagen(true)

      validarImagen(archivo)

      const imagenBase64 = await leerImagen(archivo)

      setFormulario((anterior) => ({
        ...anterior,
        imagen: imagenBase64,
      }))

      setNombreImagen(archivo.name)
    } catch (err) {
      setError(err.message)
    } finally {
      setProcesandoImagen(false)
    }
  }

  async function seleccionarImagen(evento) {
    const archivo = evento.target.files?.[0]

    await procesarArchivoImagen(archivo)

    evento.target.value = ''
  }

  function arrastrarSobreZona(evento) {
    evento.preventDefault()
    evento.stopPropagation()
    setArrastrando(true)
  }

  function salirDeZona(evento) {
    evento.preventDefault()
    evento.stopPropagation()
    setArrastrando(false)
  }

  async function soltarImagen(evento) {
    evento.preventDefault()
    evento.stopPropagation()
    setArrastrando(false)

    const archivo = evento.dataTransfer.files?.[0]

    await procesarArchivoImagen(archivo)
  }

  function quitarImagen() {
    setFormulario((anterior) => ({
      ...anterior,
      imagen: '',
    }))

    setNombreImagen('')
    setError('')
  }

  async function guardarProducto(evento) {
    evento.preventDefault()

    setMensaje('')
    setError('')

    if (procesandoImagen) {
      setError('Espera a que termine de cargar la imagen.')
      return
    }

    if (
      !formulario.codigo.trim() ||
      !formulario.nombre.trim() ||
      !formulario.categoria.trim()
    ) {
      setError('Código, nombre y categoría son obligatorios.')
      return
    }

    const precio = Number(formulario.precio)
    const stock = Number(formulario.stock)
    const stockCritico = Number(formulario.stockCritico)

    if (
      formulario.precio === '' ||
      !Number.isFinite(precio) ||
      precio < 0
    ) {
      setError('Ingresa un precio válido.')
      return
    }

    if (
      formulario.stock === '' ||
      !Number.isInteger(stock) ||
      stock < 0
    ) {
      setError('El stock debe ser un número entero positivo o cero.')
      return
    }

    if (
      formulario.stockCritico === '' ||
      !Number.isInteger(stockCritico) ||
      stockCritico < 0
    ) {
      setError('El stock crítico debe ser un número entero válido.')
      return
    }

    const datosProducto = {
      codigo: formulario.codigo.trim(),
      nombre: formulario.nombre.trim(),
      descripcion: formulario.descripcion.trim(),
      precio,
      stock,
      stockCritico,
      categoria: formulario.categoria.trim(),
      imagen: formulario.imagen.trim(),
    }

    const editando = productoEditando !== null

    const url = editando
      ? `${API_URL}/${productoEditando}`
      : API_URL

    try {
      setGuardando(true)

      const respuesta = await fetch(url, {
        method: editando ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosProducto),
      })

      const resultado = await respuesta.json()

      if (!respuesta.ok) {
        throw new Error(
          resultado.mensaje || 'No se pudo guardar el producto'
        )
      }

      limpiarFormulario()
      await cargarProductos()

      setMensaje(
        editando
          ? 'Producto actualizado correctamente.'
          : 'Producto creado correctamente.'
      )
    } catch (err) {
      setError(err.message)
    } finally {
      setGuardando(false)
    }
  }

  async function eliminarProducto(producto) {
    const confirmado = window.confirm(
      `¿Seguro que deseas eliminar "${producto.nombre}"?`
    )

    if (!confirmado) return

    setMensaje('')
    setError('')

    try {
      const respuesta = await fetch(
        `${API_URL}/${producto.id}`,
        { method: 'DELETE' }
      )

      const resultado = await respuesta.json()

      if (!respuesta.ok) {
        throw new Error(
          resultado.mensaje || 'No se pudo eliminar el producto'
        )
      }

      if (productoEditando === producto.id) {
        limpiarFormulario()
      }

      await cargarProductos()
      setMensaje('Producto eliminado correctamente.')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <section id="administracion" className="container py-5">
      <h2 className="fw-bold mb-2">
        Administración de productos
      </h2>

      <p className="text-secondary mb-4">
        Gestiona los productos de nuestra tienda online.
      </p>

      {mensaje && (
        <div className="alert alert-success" role="status">
          {mensaje}
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div
        id="formulario-producto"
        className="card shadow-sm mb-5"
      >
        <div className="card-body p-4">
          <h4 className="fw-bold mb-4">
            {productoEditando !== null
              ? 'Editar producto'
              : 'Agregar nuevo producto'}
          </h4>

          <form onSubmit={guardarProducto}>
            <div className="row g-3">
              <div className="col-md-4">
                <label htmlFor="codigo" className="form-label">
                  Código
                </label>

                <input
                  id="codigo"
                  name="codigo"
                  type="text"
                  className="form-control"
                  value={formulario.codigo}
                  onChange={actualizarCampo}
                  required
                />
              </div>

              <div className="col-md-8">
                <label
                  htmlFor="nombre-producto"
                  className="form-label"
                >
                  Nombre
                </label>

                <input
                  id="nombre-producto"
                  name="nombre"
                  type="text"
                  className="form-control"
                  value={formulario.nombre}
                  onChange={actualizarCampo}
                  required
                />
              </div>

              <div className="col-12">
                <label
                  htmlFor="descripcion"
                  className="form-label"
                >
                  Descripción
                </label>

                <textarea
                  id="descripcion"
                  name="descripcion"
                  className="form-control"
                  rows="3"
                  value={formulario.descripcion}
                  onChange={actualizarCampo}
                />
              </div>

              <div className="col-md-4">
                <label htmlFor="precio" className="form-label">
                  Precio (CLP)
                </label>

                <input
                  id="precio"
                  name="precio"
                  type="number"
                  min="0"
                  step="1"
                  className="form-control"
                  value={formulario.precio}
                  onChange={actualizarCampo}
                  required
                />
              </div>

              <div className="col-md-4">
                <label htmlFor="stock" className="form-label">
                  Stock
                </label>

                <input
                  id="stock"
                  name="stock"
                  type="number"
                  min="0"
                  step="1"
                  className="form-control"
                  value={formulario.stock}
                  onChange={actualizarCampo}
                  required
                />
              </div>

              <div className="col-md-4">
                <label
                  htmlFor="stockCritico"
                  className="form-label"
                >
                  Stock crítico
                </label>

                <input
                  id="stockCritico"
                  name="stockCritico"
                  type="number"
                  min="0"
                  step="1"
                  className="form-control"
                  value={formulario.stockCritico}
                  onChange={actualizarCampo}
                  required
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="categoria" className="form-label">
                  Categoría
                </label>

                <input
                  id="categoria"
                  name="categoria"
                  type="text"
                  className="form-control"
                  placeholder="Ejemplo: Periféricos"
                  value={formulario.categoria}
                  onChange={actualizarCampo}
                  required
                />
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">
                  Cargar imagen del producto
                </label>

                <input
                  ref={inputImagenRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="d-none"
                  onChange={seleccionarImagen}
                  aria-label="Seleccionar imagen del producto"
                />

                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => inputImagenRef.current?.click()}
                  onKeyDown={(evento) => {
                    if (
                      evento.key === 'Enter' ||
                      evento.key === ' '
                    ) {
                      evento.preventDefault()
                      inputImagenRef.current?.click()
                    }
                  }}
                  onDragEnter={arrastrarSobreZona}
                  onDragOver={arrastrarSobreZona}
                  onDragLeave={salirDeZona}
                  onDrop={soltarImagen}
                  className={`border border-2 rounded-3 p-4 text-center ${
                    arrastrando
                      ? 'border-primary bg-light'
                      : 'border-secondary'
                  }`}
                  style={{
                    borderStyle: 'dashed',
                    cursor: 'pointer',
                  }}
                >
                  <div
                    className="fs-1 mb-2"
                    aria-hidden="true"
                  >
                    📤
                  </div>

                  <p className="fw-semibold mb-1">
                    Arrastra una imagen aquí
                  </p>

                  <p className="text-secondary small mb-3">
                    O selecciona una imagen desde tu computador
                  </p>

                  <span className="btn btn-outline-primary">
                    Seleccionar imagen
                  </span>

                  <p className="text-secondary small mt-3 mb-0">
                    JPG, PNG o WEBP · Máximo 2 MB
                  </p>
                </div>

                {procesandoImagen && (
                  <p className="text-primary mt-2">
                    Procesando imagen...
                  </p>
                )}

                {formulario.imagen && (
                  <div className="mt-3">
                    <p className="fw-semibold mb-2">
                      Vista previa
                    </p>

                    {nombreImagen && (
                      <p className="small text-secondary">
                        Archivo: {nombreImagen}
                      </p>
                    )}

                    <img
                      src={formulario.imagen}
                      alt="Vista previa del producto"
                      className="img-thumbnail d-block mb-3"
                      style={{
                        maxWidth: '240px',
                        maxHeight: '200px',
                        objectFit: 'contain',
                      }}
                    />

                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm"
                      onClick={quitarImagen}
                    >
                      Quitar imagen
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="d-flex flex-wrap gap-2 mt-4">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={guardando || procesandoImagen}
              >
                {guardando
                  ? 'Guardando...'
                  : productoEditando !== null
                    ? 'Guardar cambios'
                    : 'Crear producto'}
              </button>

              {productoEditando !== null && (
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={limpiarFormulario}
                >
                  Cancelar edición
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <h4 className="fw-bold mb-3">
        Productos registrados ({productos.length})
      </h4>

      {cargando ? (
        <p>Cargando productos...</p>
      ) : productos.length === 0 ? (
        <div className="alert alert-info">
          No hay productos registrados.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {productos.map((producto) => {
                const stock = Number(producto.stock)
                const critico = Number(
                  producto.stockCritico ?? 5
                )

                const sinStock = stock <= 0
                const stockBajo =
                  !sinStock && stock <= critico

                return (
                  <tr key={producto.id}>
                    <td>{producto.id}</td>

                    <td>
                      <strong>{producto.nombre}</strong>
                      <div className="small text-secondary">
                        {producto.codigo}
                      </div>
                    </td>

                    <td>{producto.categoria}</td>

                    <td>
                      {formatearPrecio(producto.precio)}
                    </td>

                    <td>{stock}</td>

                    <td>
                      {sinStock ? (
                        <span className="badge bg-danger">
                          Sin stock
                        </span>
                      ) : stockBajo ? (
                        <span className="badge bg-warning text-dark">
                          Stock crítico
                        </span>
                      ) : (
                        <span className="badge bg-success">
                          Disponible
                        </span>
                      )}
                    </td>

                    <td>
                      <div className="d-flex gap-2">
                        <button
                          type="button"
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => editarProducto(producto)}
                        >
                          Editar
                        </button>

                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => eliminarProducto(producto)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default AdminProductos

