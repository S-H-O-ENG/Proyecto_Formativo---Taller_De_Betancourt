import logoImg from './assets/logo.png'
import suprsImg from './assets/suprs.png'
import './App.css'

function App() {
  const handleSubmitCita = (e) => {
    e.preventDefault();
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();
  };

  return (
    <>
      {/* HEADER */}
      <header className="header-principal navbar navbar-expand-lg">
        <div className="container-fluid container-header">
          <div className="logo-marca-wrapper d-flex align-items-center">
            <img src={logoImg} alt="Logo Taller" className="logo-header me-2" />
            <h1 className="marca m-0">TALLER DE BETANCOURT</h1>
          </div>

          <button
            className="navbar-toggler custom-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <nav className="collapse navbar-collapse navegar" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item">
                <a className="nav-link" href="#Nosotros">Sobre Nosotros</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#donde">Encuéntranos</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#nuestrosProductos">Productos</a>
              </li>
              <li className="nav-item">
                <a className="nav-link btn-cita-nav" href="#agendacita">Agenda tu Cita</a>
              </li>
              <li className="nav-item">
                <button
                  type="button"
                  className="btn btn-login-nav"
                  data-bs-toggle="modal"
                  data-bs-target="#loginModal"
                >
                  Login
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* MODAL LOGIN */}
      <div className="modal fade" id="loginModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content modal-login">
            <div className="modal-header border-0">
              <h2 className="modal-title w-100 text-center">Iniciar Sesión</h2>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmitLogin}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Correo Electrónico:</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Ingresa tu correo"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="form-label">Contraseña:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Ingresa tu contraseña"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-ingresar w-100 py-2">Ingresar</button>

                <div className="d-flex justify-content-between mt-3">
                  <a href="#" className="link-login">¿Olvidaste tu contraseña?</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* BANNER PRINCIPAL */}
      <section className="banner-taller text-center d-flex flex-column justify-content-center align-items-center">
        <img src={suprsImg} alt="supra" className="carro-animado" />
        <h1>Potencia y Rendimiento</h1>
        <p>Tu vehículo en manos de verdaderos profesionales</p>
      </section>

      {/* SECCIONES PRINCIPALES */}
      <main className="container my-5 contenido-principal">
        <section className="seccion-contenedor p-4 mb-5 text-center" id="Nosotros">
          <h2>¿Quiénes somos?</h2>
          <p
            className="mx-auto mt-3"
            style={{ maxWidth: '800px', color: 'var(--gris-texto)' }}
          >
            Somos un taller automotriz comprometido con la excelencia mecánica. Contamos con tecnología de
            vanguardia y un equipo de técnicos altamente calificados para ofrecerte soluciones confiables y seguras.
          </p>
        </section>

        <section className="seccion-contenedor p-4 mb-5 text-center" id="donde">
          <h2 className="mb-4">Encuéntranos</h2>
          <div className="ratio ratio-21x9 mx-auto" style={{ maxWidth: '1000px', borderRadius: '8px', overflow: 'hidden' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.974443187212!2d-74.093416!3d4.60001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNC淡MzYnMDAuMCJOIDc0wrA1NSczNi4zIlc!5e0!3m2!1ses!2sco!4v1700000000000!5m2!1ses!2sco"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación del taller"
            ></iframe>
          </div>
        </section>

        <section className="seccion-contenedor p-4 mb-5" id="agendacita">
          <h2 className="text-center mb-4">Agenda tu Cita</h2>

          <div className="cita">
            <form onSubmit={handleSubmitCita} className="mx-auto" style={{ maxWidth: '600px' }}>
              <div className="mb-3">
                <label htmlFor="nombreCita" className="form-label">Nombre Completo:</label>
                <input
                  type="text"
                  id="nombreCita"
                  className="form-control"
                  placeholder="Ingrese su nombre"
                  required
                />
              </div>

              <div className="row mb-3">
                <div className="col-md-6 mb-3 mb-md-0">
                  <label htmlFor="telefonoCita" className="form-label">Teléfono de Contacto:</label>
                  <input
                    type="tel"
                    id="telefonoCita"
                    className="form-control"
                    placeholder="Ingrese número telefónico"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="fechaCita" className="form-label">Fecha Solicitada:</label>
                  <input
                    type="date"
                    id="fechaCita"
                    className="form-control"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="motivoCita" className="form-label">
                  Motivo del Servicio / Falla del Vehículo:
                </label>
                <textarea
                  id="motivoCita"
                  className="form-control"
                  rows="4"
                  placeholder="Ej: Cambio de aceite, ruido en la suspensión..."
                  required
                ></textarea>
              </div>

              <div className="text-center">
                <button type="submit" className="btn px-5 py-2 border-0 btn-enviarS">
                  Enviar Solicitud
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  )
}

export default App