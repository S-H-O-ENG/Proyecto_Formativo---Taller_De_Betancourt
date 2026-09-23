import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import '../css/Asignarservicio.css';


export default function AsignarServicios({ onNavigate }) {
  const [servicio, setServicio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [trabajador, setTrabajador] = useState('');
  const [fecha, setFecha] = useState('');
  const [servicios, setServicios] = useState([]);

  const API = 'http://localhost:3000/AsignarServicios';

  useEffect(() => {
    const cargarServicios = async () => {
      try {
        const respuesta = await fetch(API);
        const datos = await respuesta.json();
        setServicios(Array.isArray(datos) ? datos : []);
      } catch (error) {
        Swal.fire('Error', 'No se pudieron cargar los servicios', 'error');
      }
    };

    cargarServicios();
  }, []);

  const handleAsignarServicio = async () => {
    if (!servicio || !descripcion || !trabajador || !fecha) {
      Swal.fire('Campos incompletos', 'Complete todos los campos', 'warning');
      return;
    }

    const nuevoServicio = {
      id: Date.now(),
      servicio,
      descripcion,
      trabajador,
      fecha,
      estado: 'Pendiente'
    };

    try {
      const respuesta = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoServicio)
      });

      if (!respuesta.ok) {
        throw new Error('No se pudo guardar el servicio');
      }

      const servicioGuardado = await respuesta.json();
      setServicios((serviciosActuales) => [...serviciosActuales, servicioGuardado]);
      setServicio('');
      setDescripcion('');
      setTrabajador('');
      setFecha('');
    } catch (error) {
      Swal.fire('Error', 'No se pudo guardar el servicio', 'error');
    }
  };

  const handleCambiarEstado = async (id, nuevoEstado) => {
    try {
      const respuesta = await fetch(`${API}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: nuevoEstado })
      });

      if (!respuesta.ok) {
        throw new Error('No se pudo actualizar el estado');
      }

      setServicios((serviciosActuales) =>
        serviciosActuales.map((servicioActual) => (
          servicioActual.id === id
            ? { ...servicioActual, estado: nuevoEstado }
            : servicioActual
        ))
      );
    } catch (error) {
      Swal.fire('Error', 'No se pudo actualizar el estado', 'error');
    }
  };

  const pendientes = servicios.filter(s => s.estado === 'Pendiente').length;
  const asignados = servicios.filter(s => s.estado === 'Asignado').length;
  const finalizados = servicios.filter(s => s.estado === 'Finalizado').length;

  return (
        <div className="pantalla-servicios">
      <div className="encabezado">
          <button type="button" onClick={() => onNavigate?.('home')}>Inicio</button>
      </div>

      <div className="modulo">
        <div className="textmodulo">
          <h2>ASIGNAR SERVICIOS</h2>
          <p>Gestión y asignación de trabajos a empleados</p>
        </div>
      </div>

      <div className="contenedor">
        <div className="panel-izquierdo">
          <div className="card">
            <h3>Servicios Pendientes</h3>
            <span>{pendientes}</span>
          </div>

          <div className="card">
            <h3>Asignados</h3>
            <span>{asignados}</span>
          </div>

          <div className="card">
            <h3>Finalizados</h3>
            <span>{finalizados}</span>
          </div>
        </div>

        <div className="panel-derecho">
          <div className="formulario">
            <input
              type="text"
              placeholder="Nombre del servicio"
              value={servicio}
              onChange={(e) => setServicio(e.target.value)}
            />

            <input
              type="text"
              placeholder="Descripción del servicio"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />

            <select
              value={trabajador}
              onChange={(e) => setTrabajador(e.target.value)}
            >
              <option value="">Seleccionar trabajador</option>
              <option value="trabajador 1">trabajador 1</option>
              <option value="trabajador 2">trabajador 2</option>
              <option value="trabajador 3">trabajador 3</option>
            </select>

            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />

            <button className="asignar" onClick={handleAsignarServicio}>
              Asignar Servicio
            </button>
          </div>

          <div className="tabla-responsive">
            <table>
              <thead>
                <tr>
                  <th>Servicio</th>
                  <th>Descripción</th>
                  <th>Trabajador</th>
                  <th>Fecha</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {servicios.map((s) => (
                  <tr key={s.id}>
                    <td>{s.servicio}</td>
                    <td>{s.descripcion}</td>
                    <td>{s.trabajador}</td>
                    <td>{s.fecha}</td>
                    <td>
                      <select
                        value={s.estado}
                        onChange={(e) => handleCambiarEstado(s.id, e.target.value)}
                      >
                        <option value="Pendiente">Pendiente</option>
                        <option value="Asignado">Asignado</option>
                        <option value="Finalizado">Finalizado</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}