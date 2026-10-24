
import { Link } from 'react-router-dom'
import Carrusel from '../components/Carrusel'

function Inicio() {
  return (
    <>
      <section className="container py-5 text-center">
        <h1 className="fw-bold mb-3">
          Bienvenido a nuestra Tienda Online
        </h1>

        <p className="lead">
          Descubre nuestros productos y las mejores ofertas.
        </p>

        <Link
          to="/productos"
          className="btn btn-primary mt-3"
        >
          Ver productos
        </Link>
      </section>

      <Carrusel />
    </>
  )
}

export default Inicio
