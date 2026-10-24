
import { NavLink, useNavigate } from 'react-router-dom'
import { useCarrito } from '../context/CarritoContext'

function Navbar({ usuarioLogin, onLogout }) {
  const { cantidadTotal } = useCarrito()
  const navigate = useNavigate()

  const claseEnlace = ({ isActive }) =>
    `nav-link ${isActive ? 'active fw-bold' : ''}`

  function cerrarSesion() {
    onLogout()
    navigate('/login')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <NavLink className="navbar-brand fw-bold" to="/">
          Tienda Online
        </NavLink>

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

        <div
          className="collapse navbar-collapse"
          id="menuPrincipal"
        >
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item">
              <NavLink className={claseEnlace} to="/" end>
                Inicio
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className={claseEnlace} to="/productos">
                Productos
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className={claseEnlace} to="/nosotros">
                Nosotros
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className={claseEnlace} to="/blog">
                Blog
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className={claseEnlace} to="/contacto">
                Contacto
              </NavLink>
            </li>

            {usuarioLogin && (
              <li className="nav-item">
                <NavLink className={claseEnlace} to="/admin">
                  Administración
                </NavLink>
              </li>
            )}

            <li className="nav-item mt-2 mt-lg-0">
              <NavLink
                className="btn btn-primary ms-lg-3"
                to="/carrito"
              >
                🛒 Carrito
                <span className="badge bg-danger ms-2">
                  {cantidadTotal}
                </span>
              </NavLink>
            </li>

            {usuarioLogin ? (
              <>
                <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
                  <span className="navbar-text">
                    Hola, {usuarioLogin}
                  </span>
                </li>

                <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
                  <button
                    type="button"
                    className="btn btn-outline-light"
                    onClick={cerrarSesion}
                  >
                    Cerrar sesión
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
                <NavLink
                  className="btn btn-outline-light"
                  to="/login"
                >
                  Iniciar sesión
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
