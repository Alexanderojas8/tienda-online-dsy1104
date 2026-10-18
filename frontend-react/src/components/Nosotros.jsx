
function Nosotros() {
  return (
    <section className="container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold">Sobre Nosotros</h1>
        <p className="lead text-muted">
          Tecnología, calidad y confianza en un solo lugar.
        </p>
      </div>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="card h-100 shadow-sm">
            <div className="card-body p-4">
              <h3 className="card-title">Nuestra misión</h3>
              <p className="card-text">
                Ofrecer productos tecnológicos de calidad,
                con una experiencia de compra sencilla,
                accesible y segura para nuestros clientes.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card h-100 shadow-sm">
            <div className="card-body p-4">
              <h3 className="card-title">Nuestra visión</h3>
              <p className="card-text">
                Convertirnos en una tienda reconocida por
                nuestra atención, innovación y compromiso
                con los amantes de la tecnología.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-5">
        <h2>¿Por qué elegirnos?</h2>
        <p>
          Nos apasiona la tecnología y buscamos entregar
          una experiencia de compra clara y confiable.
        </p>
      </div>
    </section>
  )
}

export default Nosotros
