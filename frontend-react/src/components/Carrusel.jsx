
const imagenes = [
  {
    id: 1,
    src: '/img/carrusel/Carrusel/LaptopGamer.webp',
    titulo: 'Laptops Gamer',
    descripcion: 'Potencia y rendimiento para tus juegos favoritos.',
  },
  {
    id: 2,
    src: '/img/carrusel/Carrusel/PcGamer.webp',
    titulo: 'PC Gamer',
    descripcion: 'Equipos preparados para una experiencia increíble.',
  },
  {
    id: 3,
    src: '/img/carrusel/Carrusel/MonitorGamer.jpg',
    titulo: 'Monitores Gamer',
    descripcion: 'Disfruta cada detalle con una gran calidad de imagen.',
  },
  {
    id: 4,
    src: '/img/carrusel/Carrusel/Audifonos Gamer.webp',
    titulo: 'Audífonos Gamer',
    descripcion: 'Escucha cada detalle de tus partidas.',
  },
]

function Carrusel() {
  return (
    <section className="container py-4" aria-label="Productos destacados">
      <div
        id="carruselPrincipal"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="4000"
      >
        <div className="carousel-indicators">
          {imagenes.map((imagen, index) => (
            <button
              key={imagen.id}
              type="button"
              data-bs-target="#carruselPrincipal"
              data-bs-slide-to={index}
              className={index === 0 ? 'active' : ''}
              aria-current={index === 0 ? 'true' : undefined}
              aria-label={`Diapositiva ${index + 1}`}
            />
          ))}
        </div>

        <div className="carousel-inner rounded-4 shadow-sm">
          {imagenes.map((imagen, index) => (
            <div
              key={imagen.id}
              className={`carousel-item ${index === 0 ? 'active' : ''}`}
            >
              <div className="carrusel-contenido">
                <img
                  src={imagen.src}
                  className="carrusel-imagen"
                  alt={imagen.titulo}
                />

                <div className="carrusel-texto">
                  <h2>{imagen.titulo}</h2>
                  <p>{imagen.descripcion}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carruselPrincipal"
          data-bs-slide="prev"
          aria-label="Imagen anterior"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carruselPrincipal"
          data-bs-slide="next"
          aria-label="Imagen siguiente"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
        </button>
      </div>
    </section>
  )
}

export default Carrusel
    