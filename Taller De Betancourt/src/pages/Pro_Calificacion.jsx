import { useState } from 'react';
import Swal from 'sweetalert2';
import '../css/Pro_Clasificacion.css'; 
import logoImg from '../assets/logo.png';

function Pro_Calificacion() {

  const API = 'http://localhost:5000';

  const [calificaciones, setCalificaciones] = useState([]);
  const [proveedores, setProveedores] = useState([]);

  const [modal, setModal] = useState(false);
  const [editando, setEditando] = useState(null);
  const [buscar, setBuscar] = useState('');

  const [formulario, setFormulario] = useState({
    proveedorId: '',
    fecha: '',
    tiempo: 5,
    calidad: 5,
    cumplimiento: 5,
    precio: 5
  });

  const cargarDatos = async () => {

    try {

      const respuestaCalificaciones =
        await fetch(`${API}/calificaciones`);

      const datosCalificaciones =
        await respuestaCalificaciones.json();

      const respuestaProveedores =
        await fetch(`${API}/proveedores`);

      const datosProveedores =
        await respuestaProveedores.json();

      setCalificaciones(datosCalificaciones);
      setProveedores(datosProveedores);

    } catch (error) {

      console.error(error);

    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const promedio =
    (
      Number(formulario.tiempo) +
      Number(formulario.calidad) +
      Number(formulario.cumplimiento) +
      Number(formulario.precio)
    ) / 4;

  const abrirModal = () => {

    setEditando(null);

    setFormulario({
      proveedorId: proveedores.length > 0
        ? proveedores[0].id
        : '',
      fecha: new Date().toISOString().split('T')[0],
      tiempo: 5,
      calidad: 5,
      cumplimiento: 5,
      precio: 5
    });

    setModal(true);
  };

  const cerrarModal = () => {
    setModal(false);
    setEditando(null);
  };

  const manejarCambio = (e) => {

    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });

  };

  const guardar = async (e) => {

    e.preventDefault();

    try {

      const datos = {
        proveedorId: Number(formulario.proveedorId),
        fecha: formulario.fecha,
        tiempo: Number(formulario.tiempo),
        calidad: Number(formulario.calidad),
        cumplimiento: Number(formulario.cumplimiento),
        precio: Number(formulario.precio),
        promedio: Number(promedio.toFixed(2))
      };

      if (editando) {

        await fetch(`${API}/calificaciones/${editando.id}`, {

          method: 'PUT',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({
            id: editando.id,
            ...datos
          })

        });

      } else {

        const nuevoId =
          calificaciones.length > 0
            ? Math.max(
                ...calificaciones.map(c => Number(c.id))
              ) + 1
            : 1;

        await fetch(`${API}/calificaciones`, {

          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({
            id: nuevoId,
            ...datos
          })

        });

      }

      await cargarDatos();

      cerrarModal();

    } catch (error) {

      console.error(error);

    }

  };

  const editar = (calificacion) => {

    setEditando(calificacion);

    setFormulario({
      proveedorId: calificacion.proveedorId,
      fecha: calificacion.fecha,
      tiempo: calificacion.tiempo,
      calidad: calificacion.calidad,
      cumplimiento: calificacion.cumplimiento,
      precio: calificacion.precio
    });

    setModal(true);

  };

  const eliminar = async (id) => {

    const confirmar =
      window.confirm('¿Deseas eliminar esta calificación?');

    if (!confirmar) return;

    await fetch(`${API}/calificaciones/${id}`, {
      method: 'DELETE'
    });

    cargarDatos();

  };

  const nombreProveedor = (id) => {

    const proveedor =
      proveedores.find(
        p => Number(p.id) === Number(id)
      );

    return proveedor
      ? proveedor.proveedor
      : 'Sin proveedor';

  };

  const filtradas = calificaciones.filter(c => {

    const proveedor =
      nombreProveedor(c.proveedorId).toLowerCase();

    return (
      String(c.id).includes(buscar) ||
      proveedor.includes(buscar.toLowerCase()) ||
      c.fecha.includes(buscar)
    );

  });

  const promedioGeneral =
    calificaciones.length > 0
      ? (
          calificaciones.reduce(
            (total, c) => total + Number(c.promedio),
            0
          ) / calificaciones.length
        ).toFixed(2)
      : '0.00';

  return (
    <>

      <div className="cuadros mb-4">

        <div className="encabezado shadow p-3">

          <h2>
            Calificación de Proveedores
          </h2>

          <h5>
            Evaluación y seguimiento del desempeño
          </h5>

        </div>

      </div>

      <div className="contenedor-cards row g-3 mb-4">

        <div className="col-md-4">

          <div className="card p-3">

            <div className="header d-flex justify-content-between">

              <span>
                Total calificaciones
              </span>

              <i className="fa-solid fa-ranking-star"></i>

            </div>

            <h2 className="mt-2">
              {calificaciones.length}
            </h2>

            <p className="mb-0 small">
              Evaluaciones realizadas
            </p>

          </div>

        </div>

        <div className="col-md-4">

          <div className="card p-3">

            <div className="header d-flex justify-content-between">

              <span>
                Promedio general
              </span>

              <i className="fa-solid fa-star"></i>

            </div>

            <h2 className="mt-2 text-warning">
              {promedioGeneral}
            </h2>

            <p className="mb-0 small">
              Sobre 5.0
            </p>

          </div>

        </div>

        <div className="col-md-4">

          <div className="card p-3">

            <div className="header d-flex justify-content-between">

              <span>
                Proveedores
              </span>

              <i className="fa-solid fa-people-group"></i>

            </div>

            <h2 className="mt-2 text-success">
              {proveedores.length}
            </h2>

            <p className="mb-0 small">
              Registrados
            </p>

          </div>

        </div>

      </div>

      <div className="tabla-contenedor">

        <div className="card shadow p-3">

          <div className="card-header bg-transparent border-0 d-flex justify-content-between align-items-center px-0 mb-3">

            <h3 className="mb-0 text-white">
              Listado de Calificaciones
            </h3>

            <button
              className="btn btn-registrar"
              onClick={abrirModal}
            >
              <i className="fa-solid fa-plus"></i>
              {' '}
              Nueva Calificación
            </button>

          </div>

          <div className="mb-3">

            <input
              type="text"
              className="form-control"
              placeholder="Buscar..."
              value={buscar}
              onChange={(e) => setBuscar(e.target.value)}
            />

          </div>

          <div className="table-responsive">

            <table className="table table-hover">

              <thead>

                <tr>

                  <th>ID</th>
                  <th>Proveedor</th>
                  <th>Fecha</th>
                  <th>Tiempo</th>
                  <th>Calidad</th>
                  <th>Cumplimiento</th>
                  <th>Precio</th>
                  <th>Promedio</th>
                  <th>Acciones</th>

                </tr>

              </thead>

              <tbody>

                {filtradas.map(c => (

                  <tr key={c.id}>

                    <td>
                      {c.id}
                    </td>

                    <td>
                      {nombreProveedor(c.proveedorId)}
                    </td>

                    <td>
                      {c.fecha}
                    </td>

                    <td>
                      {c.tiempo}
                    </td>

                    <td>
                      {c.calidad}
                    </td>

                    <td>
                      {c.cumplimiento}
                    </td>

                    <td>
                      {c.precio}
                    </td>

                    <td>

                      <span className="badge bg-warning text-dark">
                        {c.promedio}
                      </span>

                    </td>

                    <td>

                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => editar(c)}
                      >
                        <i className="fa-solid fa-pen"></i>
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => eliminar(c.id)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

      {modal && (

        <div
          className="modal fade show d-block"
          style={{
            backgroundColor: 'rgba(0,0,0,0.7)'
          }}
        >

          <div className="modal-dialog modal-dialog-centered">

            <div className="modal-content text-bg-dark">

              <div className="modal-header">

                <h5 className="modal-title">
                  {editando
                    ? 'Editar Calificación'
                    : 'Nueva Calificación'}
                </h5>

                <button
                  className="btn-close btn-close-white"
                  onClick={cerrarModal}
                >
                </button>

              </div>

              <form onSubmit={guardar}>

                <div className="modal-body">

                  <div className="mb-3">

                    <label>
                      Proveedor
                    </label>

                    <select
                      name="proveedorId"
                      className="form-select"
                      value={formulario.proveedorId}
                      onChange={manejarCambio}
                      required
                    >

                      {proveedores.map(p => (

                        <option
                          key={p.id}
                          value={p.id}
                        >
                          {p.proveedor}
                        </option>

                      ))}

                    </select>

                  </div>

                  <div className="mb-3">

                    <label>
                      Fecha
                    </label>

                    <input
                      type="date"
                      name="fecha"
                      className="form-control"
                      value={formulario.fecha}
                      onChange={manejarCambio}
                      required
                    />

                  </div>

                  <div className="mb-3">

                    <label>
                      Tiempo de entrega
                    </label>

                    <input
                      type="number"
                      name="tiempo"
                      min="1"
                      max="5"
                      className="form-control"
                      value={formulario.tiempo}
                      onChange={manejarCambio}
                      required
                    />

                  </div>

                  <div className="mb-3">

                    <label>
                      Calidad
                    </label>

                    <input
                      type="number"
                      name="calidad"
                      min="1"
                      max="5"
                      className="form-control"
                      value={formulario.calidad}
                      onChange={manejarCambio}
                      required
                    />

                  </div>

                  <div className="mb-3">

                    <label>
                      Cumplimiento
                    </label>

                    <input
                      type="number"
                      name="cumplimiento"
                      min="1"
                      max="5"
                      className="form-control"
                      value={formulario.cumplimiento}
                      onChange={manejarCambio}
                      required
                    />

                  </div>

                  <div className="mb-3">

                    <label>
                      Precio
                    </label>

                    <input
                      type="number"
                      name="precio"
                      min="1"
                      max="5"
                      className="form-control"
                      value={formulario.precio}
                      onChange={manejarCambio}
                      required
                    />

                  </div>

                  <div className="alert alert-info">

                    Promedio:

                    <strong>
                      {' '}
                      {promedio.toFixed(2)}
                    </strong>

                  </div>

                </div>

                <div className="modal-footer">

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={cerrarModal}
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    className="btn btn-registrar"
                  >
                    Guardar
                  </button>

                </div>

              </form>

            </div>

          </div>

        </div>

      )}

    </>
  );
}

export default Pro_Calificacion;