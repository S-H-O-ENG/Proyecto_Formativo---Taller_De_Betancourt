import { useState } from 'react';
import Swal from 'sweetalert2';
import '../css/Asignarservicio.css';


export default function AsignarServicios() {
  const [servicio, setServicio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [trabajador, setTrabajador] = useState('');
  const [fecha, setFecha] = useState('');
  const [servicios, setServicios] = useState([]);

  const handleAsignarServicio = () => {
    if (!servicio || !descripcion || !trabajador || !fecha) {
      alert('Complete todos los campos');
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

    setServicios([...servicios, nuevoServicio]);

    setServicio('');
    setDescripcion('');
    setTrabajador('');
    setFecha('');
  };

  const handleCambiarEstado = (id, nuevoEstado) => {
    setServicios(
      servicios.map(s => (s.id === id ? { ...s, estado: nuevoEstado } : s))
    );
  };

  const pendientes = servicios.filter(s => s.estado === 'Pendiente').length;
  const asignados = servicios.filter(s => s.estado === 'Asignado').length;
  const finalizados = servicios.filter(s => s.estado === 'Finalizado').length;

  return (
    <div>
      <div className="encabezado">
        <a href="#" onClick={(e) => e.preventDefault()}>Inicio</a>
        <a href="#" onClick={(e) => e.preventDefault()}>Atrás</a>
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