
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-dark text-white mt-auto py-4">
      <div className="container">
        <div className="row gy-4">
          <div className="col-md-4">
            <h5 className="fw-bold">Tienda Online</h5>

            <p className="text-white-50">
              Encuentra productos de calidad, ofertas y
              una experiencia de compra sencilla y segura.
            </p>
          </div>

          <div className="col-md-4">
            <h5 className="fw-bold">Enlaces rápidos</h5>

            <ul className="list-unstyled">
              <li className="mb-2">
                <Link
                  to="/"
                  className="text-white-50 text-decoration-none"
                >
                  Inicio
                </Link>
              </li>

              <li className="mb-2">
                <Link
                  to="/productos"
                  className="text-white-50 text-decoration-none"
                >
                  Productos
                </Link>
              </li>

              <li className="mb-2">
                <Link
                  to="/carrito"
                  className="text-white-50 text-decoration-none"
                >
                  Carrito de compras
                </Link>
              </li>

              <li className="mb-2">
                <Link
                  to="/checkout"
                  className="text-white-50 text-decoration-none"
                >
                  Finalizar compra
                </Link>
              </li>

              <li className="mb-2">
                <Link
                  to="/admin"
                  className="text-white-50 text-decoration-none"
                >
                  Administración
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-4">
            <h5 className="fw-bold">Atención al cliente</h5>

            <p className="text-white-50 mb-1">
              Consultas y soporte de nuestra tienda.
            </p>

            <p className="text-white-50">
              Próximamente podrás contactarnos mediante
              nuestro formulario.
            </p>
          </div>
        </div>

        <hr className="border-secondary" />

        <p className="text-center text-white-50 mb-0">
          © {new Date().getFullYear()} Tienda Online.
          Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}

export default Footer
