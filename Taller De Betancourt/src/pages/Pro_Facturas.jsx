import { useState } from 'react';
import Swal from 'sweetalert2';
import '../css/Pro_Facturas.css'; 
import logoImg from '../assets/logo.png';
function Pro_Facturas() {

  const API = 'http://localhost:5000';

  const [facturas, setFacturas] = useState([]);
  const [proveedores, setProveedores] = useState([]);

  const [modal, setModal] = useState(false);
  const [editando, setEditando] = useState(null);
  const [buscar, setBuscar] = useState('');

  const [formulario, setFormulario] = useState({
    proveedorId: '',
    numeroFactura: '',
    fecha: '',
    subtotal: '',
    formaPago: 'Transferencia',
    estado: 'Pendiente'
  });

  const cargarDatos = async () => {

    try {

      const respuestaFacturas =
        await fetch(`${API}/facturas`);

      const datosFacturas =
        await respuestaFacturas.json();

      const respuestaProveedores =
        await fetch(`${API}/proveedores`);

      const datosProveedores =
        await respuestaProveedores.json();

      setFacturas(datosFacturas);
      setProveedores(datosProveedores);

    } catch (error) {

      console.error(error);

    }

  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const subtotal =
    Number(formulario.subtotal) || 0;

  const iva =
    subtotal * 0.19;

  const total =
    subtotal + iva;

  const abrirModal = () => {

    setEditando(null);

    setFormulario({
      proveedorId: proveedores.length > 0
        ? proveedores[0].id
        : '',
      numeroFactura: '',
      fecha: new Date().toISOString().split('T')[0],
      subtotal: '',
      formaPago: 'Transferencia',
      estado: 'Pendiente'
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

        numeroFactura:
          formulario.numeroFactura,

        fecha:
          formulario.fecha,

        subtotal:
          subtotal,

        iva:
          Number(iva.toFixed(2)),

        total:
          Number(total.toFixed(2)),

        formaPago:
          formulario.formaPago,

        estado:
          formulario.estado

      };

      if (editando) {

        await fetch(
          `${API}/facturas/${editando.id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id: editando.id,
              ...datos
            })
          }
        );

      } else {

        const nuevoId =
          facturas.length > 0
            ? Math.max(
                ...facturas.map(f => Number(f.id))
              ) + 1
            : 1;

        await fetch(`${API}/facturas`, {

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

  const editar = (factura) => {

    setEditando(factura);

    setFormulario({

      proveedorId:
        factura.proveedorId,

      numeroFactura:
        factura.numeroFactura,

      fecha:
        factura.fecha,

      subtotal:
        factura.subtotal,

      formaPago:
        factura.formaPago,

      estado:
        factura.estado

    });

    setModal(true);

  };

  const eliminar = async (id) => {

    const confirmar =
      window.confirm('¿Deseas eliminar esta factura?');

    if (!confirmar) return;

    await fetch(`${API}/facturas/${id}`, {
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

  const facturasFiltradas =
    facturas.filter(f => {

      const proveedor =
        nombreProveedor(
          f.proveedorId
        ).toLowerCase();

      return (

        String(f.id)
          .toLowerCase()
          .includes(buscar.toLowerCase()) ||

        f.numeroFactura
          .toLowerCase()
          .includes(buscar.toLowerCase()) ||

        proveedor.includes(
          buscar.toLowerCase()
        ) ||

        f.fecha.includes(buscar) ||

        f.estado
          .toLowerCase()
          .includes(buscar.toLowerCase())

      );

    });

  const pendientes =
    facturas.filter(
      f => f.estado === 'Pendiente'
    ).length;

  const pagadas =
    facturas.filter(
      f => f.estado === 'Pagada'
    ).length;

  const totalFacturado =
    facturas.reduce(
      (total, f) =>
        total + Number(f.total || 0),
      0
    );

  return (
    <>

      <div className="cuadros mb-4">

        <div className="encabezado shadow p-3">

          <h2>
            Gestión de Facturas
          </h2>

          <h5>
            Registro y control de facturas de proveedores
          </h5>

        </div>

      </div>

      <div className="contenedor-cards row g-3 mb-4">

        <div className="col-md-3">

          <div className="card p-3">

            <div className="header d-flex justify-content-between">

              <span>
                Total facturas
              </span>

              <i className="fa-solid fa-receipt"></i>

            </div>

            <h2 className="mt-2">
              {facturas.length}
            </h2>

            <p className="mb-0 small">
              Facturas registradas
            </p>

          </div>

        </div>

        <div className="col-md-3">

          <div className="card p-3">

            <div className="header d-flex justify-content-between">

              <span>
                Pagadas
              </span>

              <i className="fa-solid fa-circle-check"></i>

            </div>

            <h2 className="mt-2 text-success">
              {pagadas}
            </h2>

            <p className="mb-0 small">
              Facturas pagadas
            </p>

          </div>

        </div>

        <div className="col-md-3">

          <div className="card p-3">

            <div className="header d-flex justify-content-between">

              <span>
                Pendientes
              </span>

              <i className="fa-solid fa-clock"></i>

            </div>

            <h2 className="mt-2 text-warning">
              {pendientes}
            </h2>

            <p className="mb-0 small">
              Por pagar
            </p>

          </div>

        </div>

        <div className="col-md-3">

          <div className="card p-3">

            <div className="header d-flex justify-content-between">

              <span>
                Total
              </span>

              <i className="fa-solid fa-money-bill"></i>

            </div>

            <h2 className="mt-2">
              ${totalFacturado.toLocaleString('es-CO')}
            </h2>

            <p className="mb-0 small">
              Valor facturado
            </p>

          </div>

        </div>

      </div>

      <div className="tabla-contenedor">

        <div className="card shadow p-3">

          <div className="card-header bg-transparent border-0 d-flex justify-content-between align-items-center px-0 mb-3">

            <h3 className="mb-0 text-white">
              Listado de Facturas
            </h3>

            <button
              className="btn btn-registrar"
              onClick={abrirModal}
            >
              <i className="fa-solid fa-plus"></i>
              {' '}
              Registrar Factura
            </button>

          </div>

          <div className="mb-3">

            <input
              type="text"
              className="form-control"
              placeholder="Buscar factura..."
              value={buscar}
              onChange={(e) =>
                setBuscar(e.target.value)
              }
            />

          </div>

          <div className="table-responsive">

            <table className="table table-hover">

              <thead>

                <tr>

                  <th>ID</th>
                  <th>Proveedor</th>
                  <th>N° Factura</th>
                  <th>Fecha</th>
                  <th>Subtotal</th>
                  <th>IVA</th>
                  <th>Total</th>
                  <th>Forma de pago</th>
                  <th>Estado</th>
                  <th>Acciones</th>

                </tr>

              </thead>

              <tbody>

                {facturasFiltradas.map(f => (

                  <tr key={f.id}>

                    <td>
                      {f.id}
                    </td>

                    <td>
                      {nombreProveedor(
                        f.proveedorId
                      )}
                    </td>

                    <td>
                      {f.numeroFactura}
                    </td>

                    <td>
                      {f.fecha}
                    </td>

                    <td>
                      $
                      {Number(
                        f.subtotal
                      ).toLocaleString('es-CO')}
                    </td>

                    <td>
                      $
                      {Number(
                        f.iva
                      ).toLocaleString('es-CO')}
                    </td>

                    <td>
                      $
                      {Number(
                        f.total
                      ).toLocaleString('es-CO')}
                    </td>

                    <td>
                      {f.formaPago}
                    </td>

                    <td>

                      <span
                        className={
                          f.estado === 'Pagada'
                            ? 'badge bg-success'
                            : f.estado === 'Pendiente'
                            ? 'badge bg-warning text-dark'
                            : 'badge bg-danger'
                        }
                      >
                        {f.estado}
                      </span>

                    </td>

                    <td>

                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => editar(f)}
                      >
                        <i className="fa-solid fa-pen"></i>
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          eliminar(f.id)
                        }
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
            backgroundColor:
              'rgba(0,0,0,0.7)'
          }}
        >

          <div className="modal-dialog modal-dialog-centered">

            <div className="modal-content text-bg-dark">

              <div className="modal-header">

                <h5 className="modal-title">

                  {editando
                    ? 'Editar Factura'
                    : 'Registrar Factura'}

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
                      Número de factura
                    </label>

                    <input
                      type="text"
                      name="numeroFactura"
                      className="form-control"
                      placeholder="FAC-001"
                      value={formulario.numeroFactura}
                      onChange={manejarCambio}
                      required
                    />

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
                      Subtotal
                    </label>

                    <input
                      type="number"
                      name="subtotal"
                      className="form-control"
                      min="0"
                      value={formulario.subtotal}
                      onChange={manejarCambio}
                      required
                    />

                  </div>

                  <div className="mb-3">

                    <label>
                      IVA 19%
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      value={`$${iva.toLocaleString('es-CO')}`}
                      readOnly
                    />

                  </div>

                  <div className="mb-3">

                    <label>
                      Total
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      value={`$${total.toLocaleString('es-CO')}`}
                      readOnly
                    />

                  </div>

                  <div className="mb-3">

                    <label>
                      Forma de pago
                    </label>

                    <select
                      name="formaPago"
                      className="form-select"
                      value={formulario.formaPago}
                      onChange={manejarCambio}
                    >

                      <option value="Efectivo">
                        Efectivo
                      </option>

                      <option value="Transferencia">
                        Transferencia
                      </option>

                      <option value="Tarjeta">
                        Tarjeta
                      </option>

                      <option value="Crédito">
                        Crédito
                      </option>

                    </select>

                  </div>

                  <div className="mb-3">

                    <label>
                      Estado
                    </label>

                    <select
                      name="estado"
                      className="form-select"
                      value={formulario.estado}
                      onChange={manejarCambio}
                    >

                      <option value="Pendiente">
                        Pendiente
                      </option>

                      <option value="Pagada">
                        Pagada
                      </option>

                      <option value="Anulada">
                        Anulada
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

export default Pro_Facturas;