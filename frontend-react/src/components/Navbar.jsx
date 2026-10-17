
import { useCarrito } from '../context/CarritoContext'

function Navbar() {
  const { cantidadTotal } = useCarrito()

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand fw-bold" href="/">
          Tienda Online
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menuPrincipal"
          aria-controls="menuPrincipal"
          aria-expanded="false"
          aria-label="Abrir menú"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="menuPrincipal">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="/">
                Inicio
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#productos">
                Productos
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#nosotros">
                Nosotros
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#contacto">
                Contacto
              </a>
            </li>

            <li className="nav-item">
              <a
                className="btn btn-primary ms-lg-3"
                href="#carrito"
              >
                🛒 Carrito

                <span className="badge bg-danger ms-2">
                  {cantidadTotal}
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
