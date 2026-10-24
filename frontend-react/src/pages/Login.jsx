
import LoginForm from '../components/LoginForm'

export default function Login({ onLogin }) {
  return (
    <section className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-5">
          <div className="card shadow border-0">
            <div className="card-body p-4">
              <h1 className="h3 text-center mb-3">
                Iniciar sesión
              </h1>

              <p className="text-muted text-center mb-4">
                Bienvenido a nuestra Tienda Online Gamer.
                Ingresa tus credenciales para continuar.
              </p>

              <LoginForm onLogin={onLogin} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
