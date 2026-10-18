
import { useState } from 'react'

const publicaciones = [
  {
    id: 1,
    titulo: 'Cómo elegir un mouse gamer',
    descripcion:
      'Conoce los aspectos importantes para elegir un mouse según tu estilo de juego.',
    contenido:
      'Considera la ergonomía, el sensor, la sensibilidad DPI y la cantidad de botones. Un buen mouse debe adaptarse a tu mano y a los juegos que utilizas.'
  },
  {
    id: 2,
    titulo: 'Consejos para mejorar tu setup',
    descripcion:
      'Organiza tu espacio para jugar o trabajar de manera más cómoda.',
    contenido:
      'Ajusta la altura del monitor, organiza los cables, mejora la iluminación y utiliza periféricos cómodos. Una buena distribución puede mejorar tu experiencia diaria.'
  },
  {
    id: 3,
    titulo: '¿Qué monitor gamer elegir?',
    descripcion:
      'Descubre qué características revisar antes de comprar un monitor.',
    contenido:
      'Revisa la resolución, la tasa de refresco, el tiempo de respuesta y el tipo de panel. La mejor elección dependerá de tu presupuesto y del uso que le darás.'
  }
]

function Blog() {
  const [publicacionSeleccionada, setPublicacionSeleccionada] =
    useState(null)

  return (
    <section className="container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold">Blog tecnológico</h1>
        <p className="lead text-muted">
          Noticias, consejos y recomendaciones.
        </p>
      </div>

      {publicacionSeleccionada ? (
        <article className="card shadow-sm">
          <div className="card-body p-4">
            <button
              className="btn btn-outline-secondary mb-4"
              onClick={() => setPublicacionSeleccionada(null)}
            >
              ← Volver al blog
            </button>

            <h2>{publicacionSeleccionada.titulo}</h2>

            <p>{publicacionSeleccionada.contenido}</p>
          </div>
        </article>
      ) : (
        <div className="row g-4">
          {publicaciones.map((publicacion) => (
            <div
              className="col-md-4"
              key={publicacion.id}
            >
              <article className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column">
                  <h3 className="h5">
                    {publicacion.titulo}
                  </h3>

                  <p className="text-muted">
                    {publicacion.descripcion}
                  </p>

                  <button
                    className="btn btn-primary mt-auto"
                    onClick={() =>
                      setPublicacionSeleccionada(publicacion)
                    }
                  >
                    Leer artículo
                  </button>
                </div>
              </article>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Blog
