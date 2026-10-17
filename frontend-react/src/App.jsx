
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Productos from './components/Productos'
import Carrusel from './components/Carrusel'
import Carrito from './components/Carrito'
import Checkout from './components/Checkout'

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <main className="flex-grow-1">
        <section className="container py-5 text-center">
          <h1 className="fw-bold mb-3">
            Bienvenido a nuestra Tienda Online
          </h1>

          <p className="lead">
            Descubre nuestros productos y las mejores ofertas.
          </p>

          <a href="#productos" className="btn btn-primary mt-3">
            Ver productos
          </a>
        </section>

        <Carrusel />

        <Productos />

        <Carrito />

        <Checkout />
      </main>

      <Footer />
    </div>
  )
}

export default App
