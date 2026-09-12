import { useState } from 'react';
import Swal from 'sweetalert2';
import '../css/proveedores.css'; 
import logoImg from '../assets/logo.png';
function Proveedores() {

  const API = 'http://localhost:5000';

  const [proveedores, setProveedores] = useState([]);

  const [modal, setModal] = useState(false);

  const [editando, setEditando] = useState(null);

  const [buscar, setBuscar] = useState('');

  const [formulario, setFormulario] = useState({
    proveedor: '',
    telefono: '',
    correo: '',
    ciudad: '',
    estado: 'Activo'
  });

  const cargarProveedores = async () => {
    try {
      const respuesta = await fetch(`${API}/proveedores`);
      const datos = await respuesta.json();
      setProveedores(datos);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    cargarProveedores();
  }, []);

  const abrirModal = () => {
    setEditando(null);

    setFormulario({
      proveedor: '',
      telefono: '',
      correo: '',
      ciudad: '',
      estado: 'Activo'
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

  const guardarProveedor = async (e) => {
    e.preventDefault();

    try {

      if (editando) {

        await fetch(`${API}/proveedores/${editando.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: editando.id,
            ...formulario
          })
        });

      } else {

        const nuevoId =
          proveedores.length > 0
            ? Math.max(...proveedores.map(p => Number(p.id))) + 1
            : 1;

        await fetch(`${API}/proveedores`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: nuevoId,
            ...formulario
          })
        });
      }

      await cargarProveedores();

      cerrarModal();

    } catch (error) {
      console.error(error);
    }
  };

  const editarProveedor = (proveedor) => {

    setEditando(proveedor);

    setFormulario({
      proveedor: proveedor.proveedor,
      telefono: proveedor.telefono,
      correo: proveedor.correo,
      ciudad: proveedor.ciudad,
      estado: proveedor.estado
    });

    setModal(true);
  };

  const eliminarProveedor = async (id) => {

    const confirmar = window.confirm(
      '¿Deseas eliminar este proveedor?'
    );

    if (!confirmar) return;

    try {

      await fetch(`${API}/proveedores/${id}`, {
        method: 'DELETE'
      });

      cargarProveedores();

    } catch (error) {
      console.error(error);
    }
  };

  const proveedoresFiltrados = proveedores.filter((p) =>
    String(p.id).toLowerCase().includes(buscar.toLowerCase()) ||
    p.proveedor.toLowerCase().includes(buscar.toLowerCase()) ||
    p.telefono.toLowerCase().includes(buscar.toLowerCase()) ||
    p.correo.toLowerCase().includes(buscar.toLowerCase()) ||
    p.ciudad.toLowerCase().includes(buscar.toLowerCase()) ||
    p.estado.toLowerCase().includes(buscar.toLowerCase())
  );

  const activos = proveedores.filter(
    p => p.estado === 'Activo'
  ).length;

  const pendientes = proveedores.filter(
    p => p.estado === 'Pendiente'
  ).length;

  return (
    <>

      <div className="cuadros mb-4">

        <div className="encabezado shadow d-flex align-items-center gap-3 p-3">

          <div>
            <h2>Gestión de Proveedores</h2>

            <h5>
              Registro y validación de proveedores
            </h5>
          </div>

        </div>

      </div>

      <div className="busquedar container-fluid px-0">

        <div className="contenedor-cards row g-3 mb-4">

          <div className="col-md-4">

            <div className="card p-3">

              <div className="header d-flex justify-content-between">

                <span>
                  Total proveedores
                </span>

                <i className="fa-solid fa-people-line"></i>

              </div>

              <h2 className="mt-2">
                {proveedores.length}
              </h2>

              <p className="mb-0 small">
                Proveedores Registrados
              </p>

            </div>

          </div>

          <div className="col-md-4">

            <div className="card p-3">

              <div className="header d-flex justify-content-between">

                <span>
                  Activos
                </span>

                <i className="fa-solid fa-user-check"></i>

              </div>

              <h2 className="mt-2 text-success">
                {activos}
              </h2>

              <p className="mb-0 small">
                Proveedores Activos
              </p>

            </div>

          </div>

          <div className="col-md-4">

            <div className="card p-3">

              <div className="header d-flex justify-content-between">

                <span>
                  En revisión
                </span>

                <i className="fa-solid fa-code-compare"></i>

              </div>

              <h2 className="mt-2 text-warning">
                {pendientes}
              </h2>

              <p className="mb-0 small">
                Pendientes De Aprobación
              </p>

            </div>

          </div>

        </div>

        <div className="tabla-contenedor">

          <div className="card shadow p-3">

            <div className="card-header bg-transparent border-0 d-flex justify-content-between align-items-center px-0 mb-3">

              <h3 className="mb-0 text-white">
                Listado de Proveedores
              </h3>

              <button
                className="btn btn-registrar"
                onClick={abrirModal}
              >
                <i className="fa-solid fa-plus"></i>
                {' '}
                Registrar Proveedor
              </button>

            </div>

            <div className="mb-3">

              <input
                type="text"
                className="form-control"
                placeholder="Buscar proveedor..."
                value={buscar}
                onChange={(e) => setBuscar(e.target.value)}
              />

            </div>

            <div className="table-responsive">

              <table
                id="tablaProveedores"
                className="table table-hover nowrap w-100"
              >

                <thead>

                  <tr>

                    <th>ID</th>
                    <th>Proveedor</th>
                    <th>Teléfono</th>
                    <th>Correo</th>
                    <th>Ciudad</th>
                    <th>Estado</th>
                    <th>Acciones</th>

                  </tr>

                </thead>

                <tbody>

                  {proveedoresFiltrados.map((p) => (

                    <tr key={p.id}>

                      <td>
                        {p.id}
                      </td>

                      <td>
                        {p.proveedor}
                      </td>

                      <td>
                        {p.telefono}
                      </td>

                      <td>
                        {p.correo}
                      </td>

                      <td>
                        {p.ciudad}
                      </td>

                      <td>

                        <span
                          className={
                            p.estado === 'Activo'
                              ? 'badge bg-success'
                              : p.estado === 'Pendiente'
                              ? 'badge bg-warning text-dark'
                              : 'badge bg-danger'
                          }
                        >
                          {p.estado}
                        </span>

                      </td>

                      <td>

                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => editarProveedor(p)}
                        >
                          <i className="fa-solid fa-pen"></i>
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => eliminarProveedor(p.id)}
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

      </div>

      {modal && (

        <div
          className="modal fade show d-block"
          style={{
            backgroundColor: 'rgba(0,0,0,0.7)'
          }}
        >

          <div className="modal-dialog modal-dialog-centered">

            <div className="modal-content text-bg-dark border-secondary">

              <div className="modal-header">

                <h5 className="modal-title">

                  {editando
                    ? 'Editar Proveedor'
                    : 'Registrar Proveedor'}

                </h5>

                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={cerrarModal}
                >
                </button>

              </div>

              <form onSubmit={guardarProveedor}>

                <div className="modal-body">

                  <div className="mb-2">

                    <input
                      type="text"
                      name="proveedor"
                      className="form-control"
                      placeholder="Proveedor"
                      value={formulario.proveedor}
                      onChange={manejarCambio}
                      required
                    />

                  </div>

                  <div className="mb-2">

                    <input
                      type="text"
                      name="telefono"
                      className="form-control"
                      placeholder="Teléfono"
                      value={formulario.telefono}
                      onChange={manejarCambio}
                      required
                    />

                  </div>

                  <div className="mb-2">

                    <input
                      type="email"
                      name="correo"
                      className="form-control"
                      placeholder="Correo"
                      value={formulario.correo}
                      onChange={manejarCambio}
                      required
                    />

                  </div>

                  <div className="mb-2">

                    <input
                      type="text"
                      name="ciudad"
                      className="form-control"
                      placeholder="Ciudad"
                      value={formulario.ciudad}
                      onChange={manejarCambio}
                      required
                    />

                  </div>

                  <div className="mb-2">

                    <select
                      name="estado"
                      className="form-select"
                      value={formulario.estado}
                      onChange={manejarCambio}
                    >

                      <option value="Activo">
                        Activo
                      </option>

                      <option value="Pendiente">
                        Pendiente
                      </option>

                      <option value="Inactivo">
                        Inactivo
                      </option>

                    </select>

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

export default Proveedores;