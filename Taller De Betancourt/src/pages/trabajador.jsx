
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "../css/Trabajadores.css";
import mecanico from "../assets/macanicoEjemplo.png";

function Trabajador({ onNavigate = () => {} }) {
  const nombreTrabajador = "Carlos Betancourt";
  const [esActivo, setEsActivo] = useState(true);
  const [saludo, setSaludo] = useState("");
  const [servicios, setServicios] = useState([]);

  const API = "http://localhost:5000/Trabajadores";

  useEffect(() => {
    const cargarServicios = async () => {
      try {
        const respuesta = await fetch(API);
        const datos = await respuesta.json();
        setServicios(Array.isArray(datos) ? datos : []);
      } catch (error) {
        Swal.fire("Error", "No se pudieron cargar los servicios", "error");
      }
    };

    cargarServicios();
  }, []);

  useEffect(() => {
    const hora = new Date().getHours();
    let saludoCalculado = "";

    if (hora < 12) {
      saludoCalculado = "¡Buenos días!";
    } else if (hora < 18) {
      saludoCalculado = "¡Buenas tardes!";
    } else {
      saludoCalculado = "¡Buenas noches!";
    }

    setSaludo(saludoCalculado);

    console.log(`${saludoCalculado} Bienvenido al perfil de ${nombreTrabajador}.`);
    console.log("Fecha:", new Date().toLocaleDateString());
    console.log("Hora:", new Date().toLocaleTimeString());
  }, [nombreTrabajador]);

  const toggleEstado = () => {
    setEsActivo(!esActivo);
  };

  const asignados = servicios.filter((servicio) => servicio.estado === "Asignado").length;
  const finalizados = servicios.filter((servicio) => servicio.estado === "Finalizado").length;
  const pendientes = servicios.filter((servicio) => servicio.estado === "Pendiente").length;

  const horarios = [
    { dia: 'Lunes', entrada: '8:00 AM', salida: '6:00 PM' },
    { dia: 'Martes', entrada: '8:00 AM', salida: '6:00 PM' },
    { dia: 'Miércoles', entrada: '8:00 AM', salida: '6:00 PM' },
    { dia: 'Jueves', entrada: '8:00 AM', salida: '6:00 PM' },
    { dia: 'Viernes', entrada: '8:00 AM', salida: '6:00 PM' },
    { dia: 'Sábado', entrada: '8:00 AM', salida: '2:00 PM' },
  ];

  return (
    <div className="trabajador-wrapper">
      <header>
        <div className="logo">
          <h2>
            <span>TALLER DE BETANCOURT</span>
          </h2>
        </div>

        <nav>
          <button type="button" onClick={() => onNavigate('AsignarServicios')}>
            Servicios
          </button>
          <button type="button" onClick={() => onNavigate('home')}>
            Inicio
          </button>
        </nav>
      </header>

      <main className="contenedor">
        {/* SECCIÓN PERFIL */}
        <section className="perfil">
          <div className="foto">
            <img className="fotoMeca" src={mecanico} alt="foto mecanico" />
          </div>

          <div className="datos">
            <p className="saludo-texto">{saludo}</p>
            <h1>{nombreTrabajador}</h1>
            <h3>Mecánico Automotriz</h3>

            {/* Botón dinámico de estado */}
            <span
              className={esActivo ? "activo activo-activo" : "activo activo-descanso"}
              onClick={toggleEstado}
            >
              {esActivo ? "● Activo" : "● En descanso"}
            </span>

            <p>
              Especialista en mantenimiento preventivo y correctivo de vehículos livianos
            </p>
          </div>
        </section>

        {/* SECCIÓN INFORMACIÓN Y ESPECIALIDAD */}
        <section className="info">
          <div className="card">
            <h2>Información</h2>
            <p><i className="fa-solid fa-id-card"></i> ID: TRB-001</p>
            <p><i className="fa-solid fa-phone"></i> 310 123 4567</p>
            <p><i className="fa-solid fa-envelope"></i> trabajador@correo.com</p>
            <p><i className="fa-solid fa-location-dot"></i> Bogotá, Colombia</p>
          </div>

          <div className="card">
            <h2>Especialidad</h2>
            <ul>
              <li>Motores</li>
              <li>Electricidad</li>
              <li>Frenos</li>
              <li>Suspensión</li>
              <li>Diagnóstico</li>
            </ul>
          </div>
        </section>

        {/* SECCIÓN HORARIO */}
        <section className="horario">
          <h2>Horario de Trabajo</h2>
          <table>
            <thead>
              <tr>
                <th>Día</th>
                <th>Entrada</th>
                <th>Salida</th>
              </tr>
            </thead>
            <tbody>
              {horarios.map((h, i) => (
                <tr key={i}>
                  <td>{h.dia}</td>
                  <td>{h.entrada}</td>
                  <td>{h.salida}</td>
                </tr>
              ))}
              <tr>
                <td>Domingo</td>
                <td colSpan="2">Descanso</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* SECCIÓN ESTADÍSTICAS */}
        <section className="estadisticas">
          <div className="stat">
            <h3>Servicios Asignados</h3>
            <h1 id="asignados">{asignados}</h1>
          </div>

          <div className="stat">
            <h3>Servicios Finalizados</h3>
            <h1 id="finalizados">{finalizados}</h1>
          </div>

          <div className="stat">
            <h3>Pendientes</h3>
            <h1 id="pendientes">{pendientes}</h1>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Trabajador;