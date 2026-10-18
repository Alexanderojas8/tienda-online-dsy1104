
import { useState } from 'react'

function Contacto() {
  const [formulario, setFormulario] = useState({
    nombre: '',
    correo: '',
    mensaje: ''
  })

  const [enviado, setEnviado] = useState(false)

  function manejarCambio(evento) {
    const { name, value } = evento.target

    setFormulario((anterior) => ({
      ...anterior,
      [name]: value
    }))
  }

  function enviarFormulario(evento) {
    evento.preventDefault()

    if (
      !formulario.nombre.trim() ||
      !formulario.correo.trim() ||
      !formulario.mensaje.trim()
    ) {
      alert('Completa todos los campos.')
      return
    }

    setEnviado(true)

    setFormulario({
      nombre: '',
      correo: '',
      mensaje: ''
    })
  }

  return (
    <section className="container py-5">
      <div className="text-center mb-4">
        <h1 className="fw-bold">Contáctanos</h1>
        <p className="text-muted">
          ¿Tienes alguna consulta? Escríbenos.
        </p>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              {enviado && (
                <div
                  className="alert alert-success"
                  role="status"
                >
                  Formulario completado correctamente.
                  Esta es una demostración y el mensaje
                  no se ha enviado.
                </div>
              )}

              <form onSubmit={enviarFormulario}>
                <div className="mb-3">
                  <label
                    htmlFor="nombreContacto"
                    className="form-label"
                  >
                    Nombre
                  </label>

                  <input
                    id="nombreContacto"
                    type="text"
                    name="nombre"
                    className="form-control"
                    value={formulario.nombre}
                    onChange={manejarCambio}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="correoContacto"
                    className="form-label"
                  >
                    Correo electrónico
                  </label>

                  <input
                    id="correoContacto"
                    type="email"
                    name="correo"
                    className="form-control"
                    value={formulario.correo}
                    onChange={manejarCambio}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="mensajeContacto"
                    className="form-label"
                  >
                    Mensaje
                  </label>

                  <textarea
                    id="mensajeContacto"
                    name="mensaje"
                    className="form-control"
                    rows="5"
                    value={formulario.mensaje}
                    onChange={manejarCambio}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                >
                  Enviar consulta
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contacto
