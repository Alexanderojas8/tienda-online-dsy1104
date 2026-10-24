
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

// Simulamos los componentes que no necesitamos
// ejecutar en estas pruebas de autenticación.
vi.mock('./components/Navbar', () => ({
  default: ({ usuarioLogin, onLogout }) => (
    <nav>
      {usuarioLogin ? (
        <>
          <span>Hola, {usuarioLogin}</span>
          <button onClick={onLogout}>Cerrar sesión</button>
        </>
      ) : (
        <span>Sin sesión</span>
      )}
    </nav>
  ),
}))

vi.mock('./components/Footer', () => ({
  default: () => <footer>Pie de página</footer>,
}))

vi.mock('./components/Carrusel', () => ({
  default: () => <div>Carrusel</div>,
}))

vi.mock('./pages/Productos', () => ({
  default: () => <div>Listado de productos</div>,
}))

vi.mock('./components/Carrito', () => ({
  default: () => <div>Carrito de compras</div>,
}))

vi.mock('./components/Checkout', () => ({
  default: () => <div>Finalizar compra</div>,
}))

vi.mock('./components/AdminProductos', () => ({
  default: () => <h1>Panel de administración</h1>,
}))

vi.mock('./components/Nosotros', () => ({
  default: () => <div>Nosotros</div>,
}))

vi.mock('./components/Contacto', () => ({
  default: () => <div>Contacto</div>,
}))

vi.mock('./components/Blog', () => ({
  default: () => <div>Blog</div>,
}))

function renderApp(ruta = '/') {
  return render(
    <MemoryRouter initialEntries={[ruta]}>
      <App />
    </MemoryRouter>
  )
}

describe('Pruebas de autenticación y rutas de App', () => {
  beforeEach(() => {
    sessionStorage.clear()
    localStorage.clear()
  })

  it('muestra la página de inicio', () => {
    renderApp('/')

    expect(
      screen.getByText('Bienvenido a nuestra Tienda Online')
    ).toBeInTheDocument()
  })

  it('muestra el formulario de login', () => {
    renderApp('/login')

    expect(
      screen.getByRole('button', { name: 'Ingresar' })
    ).toBeInTheDocument()
  })

  it('redirige al login cuando no existe una sesión', () => {
    renderApp('/admin')

    expect(
      screen.getByRole('button', { name: 'Ingresar' })
    ).toBeInTheDocument()

    expect(
      screen.queryByText('Panel de administración')
    ).not.toBeInTheDocument()
  })

  it('permite acceder a administración con una sesión', () => {
    sessionStorage.setItem('usuarioLogin', 'Admin')

    renderApp('/admin')

    expect(
      screen.getByText('Panel de administración')
    ).toBeInTheDocument()
  })

  it('inicia sesión con las credenciales correctas', () => {
    renderApp('/login')

    fireEvent.change(screen.getByLabelText('Usuario'), {
      target: { value: 'Admin' },
    })

    fireEvent.change(screen.getByLabelText('Contraseña'), {
      target: { value: '123456' },
    })

    fireEvent.click(
      screen.getByRole('button', { name: 'Ingresar' })
    )

    expect(
      sessionStorage.getItem('usuarioLogin')
    ).toBe('Admin')

    expect(
      localStorage.getItem('ultimoUsuario')
    ).toBe('Admin')

    expect(
      screen.getByText('Hola, Admin')
    ).toBeInTheDocument()
  })

  it('rechaza las credenciales incorrectas', () => {
    renderApp('/login')

    fireEvent.change(screen.getByLabelText('Usuario'), {
      target: { value: 'UsuarioIncorrecto' },
    })

    fireEvent.change(screen.getByLabelText('Contraseña'), {
      target: { value: 'ClaveIncorrecta' },
    })

    fireEvent.click(
      screen.getByRole('button', { name: 'Ingresar' })
    )

    expect(
      screen.getByText('Usuario o contraseña incorrectos')
    ).toBeInTheDocument()

    expect(
      sessionStorage.getItem('usuarioLogin')
    ).toBeNull()
  })

  it('redirige al inicio si ya existe una sesión', () => {
    sessionStorage.setItem('usuarioLogin', 'Admin')

    renderApp('/login')

    expect(
      screen.getByText('Bienvenido a nuestra Tienda Online')
    ).toBeInTheDocument()
  })

  it('elimina la sesión al cerrar sesión', () => {
    sessionStorage.setItem('usuarioLogin', 'Admin')

    renderApp('/')

    fireEvent.click(
      screen.getByRole('button', { name: 'Cerrar sesión' })
    )

    expect(
      sessionStorage.getItem('usuarioLogin')
    ).toBeNull()

    expect(
      screen.getByText('Sin sesión')
    ).toBeInTheDocument()
  })

  it('muestra la página 404 para una ruta desconocida', () => {
    renderApp('/pagina-inexistente')

    expect(
      screen.getByText('Página no encontrada')
    ).toBeInTheDocument()
  })
})
