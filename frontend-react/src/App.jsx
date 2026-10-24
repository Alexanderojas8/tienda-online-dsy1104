
import { Routes, Route, Link } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Productos from './pages/Productos'
import Carrusel from './components/Carrusel'
import Carrito from './components/Carrito'
import Checkout from './components/Checkout'
import AdminProductos from './components/AdminProductos'
import Nosotros from './components/Nosotros'
import Contacto from './components/Contacto'
import Blog from './components/Blog'

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

function PaginaNoEncontrada() {
  return (
    <section className="container py-5 text-center">
      <h2>Página no encontrada</h2>
      <p>La dirección que buscas no existe.</p>

      <Link to="/" className="btn btn-primary">
        Volver al inicio
      </Link>
    </section>
  )
}

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin" element={<AdminProductos />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="*" element={<PaginaNoEncontrada />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
