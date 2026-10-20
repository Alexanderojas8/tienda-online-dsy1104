
import React, { act } from 'react'
import { createRoot } from 'react-dom/client'
import { MemoryRouter } from 'react-router-dom'

import Navbar from '../src/components/Navbar.jsx'
import { CarritoProvider } from '../src/context/CarritoContext.jsx'

// Configuración de React para Jasmine y Karma
globalThis.IS_REACT_ACT_ENVIRONMENT = true

describe('Pruebas del componente Navbar', () => {
  let contenedor
  let root

  beforeEach(() => {
    localStorage.removeItem('carrito-react')

    contenedor = document.createElement('div')
    document.body.appendChild(contenedor)

    root = createRoot(contenedor)
  })

  afterEach(async () => {
    await act(async () => {
      root.unmount()
    })

    contenedor.remove()
    localStorage.removeItem('carrito-react')
  })

  // Función auxiliar para renderizar el Navbar
  async function renderizarNavbar(ruta = '/') {
    await act(async () => {
      root.render(
        <MemoryRouter initialEntries={[ruta]}>
          <CarritoProvider>
            <Navbar />
          </CarritoProvider>
        </MemoryRouter>
      )
    })
  }

  // PRUEBA 1: Renderizado del nombre de la tienda
  it('debe mostrar el nombre de la tienda', async () => {
    await renderizarNavbar()

    expect(contenedor.textContent).toContain('Tienda Online')
  })

  // PRUEBA 2: Renderizado de enlaces
  it('debe mostrar los enlaces de navegación', async () => {
    await renderizarNavbar()

    expect(contenedor.textContent).toContain('Inicio')
    expect(contenedor.textContent).toContain('Productos')
    expect(contenedor.textContent).toContain('Contacto')
    expect(contenedor.textContent).toContain('Administración')
  })

  // PRUEBA 3: Estado inicial del carrito
  it('debe mostrar el carrito vacío inicialmente', async () => {
    await renderizarNavbar()

    const enlaceCarrito = contenedor.querySelector(
      'a[href="/carrito"]'
    )

    expect(enlaceCarrito).not.toBeNull()
    expect(enlaceCarrito.textContent).toContain('0')
  })

  // PRUEBA 4: Lectura de datos del carrito
  it('debe mostrar la cantidad guardada en el carrito', async () => {
    localStorage.setItem(
      'carrito-react',
      JSON.stringify([
        {
          id: 1,
          nombre: 'Mouse Gamer',
          precio: 20000,
          stock: 5,
          cantidad: 3
        }
      ])
    )

    await renderizarNavbar()

    const contador = contenedor.querySelector(
      'a[href="/carrito"] .badge'
    )

    expect(contador.textContent.trim()).toBe('3')
  })

  // PRUEBA 5: Estado activo de navegación
  it('debe marcar como activo el enlace de productos', async () => {
    await renderizarNavbar('/productos')

    const enlaceProductos = contenedor.querySelector(
      'a[href="/productos"]'
    )

    expect(
      enlaceProductos.classList.contains('active')
    ).toBeTrue()
  })

  // PRUEBA 6: Evento real de clic
  it('debe navegar a productos cuando el usuario hace clic', async () => {
    await renderizarNavbar('/')

    const enlaceProductos = contenedor.querySelector(
      'a[href="/productos"]'
    )

    expect(
      enlaceProductos.classList.contains('active')
    ).toBeFalse()

    await act(async () => {
      enlaceProductos.click()
    })

    expect(
      enlaceProductos.classList.contains('active')
    ).toBeTrue()
  })

  // PRUEBA 7: Spy de Jasmine para verificar un evento
  it('debe ejecutar un evento de clic usando un spy de Jasmine', async () => {
    await renderizarNavbar('/')

    const enlaceProductos = contenedor.querySelector(
      'a[href="/productos"]'
    )

    const funcionSimulada = jasmine.createSpy('eventoClick')

    enlaceProductos.addEventListener(
      'click',
      funcionSimulada
    )

    await act(async () => {
      enlaceProductos.click()
    })

    expect(funcionSimulada).toHaveBeenCalledTimes(1)
  })
})
