import { useCallback, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import NavbarJefe from '../components/NavbarJefe';
import '../css/Pro_Facturas.css';

const API = 'http://localhost:5000/Pro_Facturas/facturas';
const FORMULARIO_INICIAL = {
  proveedor: '',
  numeroFactura: '',
  fecha: new Date().toISOString().split('T')[0],
  subtotal: '',
  formaPago: 'Transferencia',
  estado: 'Pendiente'
};
const alertDark = Swal.mixin({ background: '#18181d', color: '#ffffff' });

function Pro_Facturas() {
  const [facturas, setFacturas] = useState([]);
  const [modal, setModal] = useState(false);
  const [editando, setEditando] = useState(null);
  const [buscar, setBuscar] = useState('');
  const [formulario, setFormulario] = useState(FORMULARIO_INICIAL);

  const cargarDatos = useCallback(async (signal) => {
    try {
      const respuesta = await fetch(API, { signal });
      if (!respuesta.ok) throw new Error('Error en la respuesta del servidor');
      const datos = await respuesta.json();
      setFacturas(Array.isArray(datos) ? datos : []);
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error(error);
        alertDark.fire({ icon: 'error', title: 'Error de conexión', text: 'No se pudieron cargar las facturas.' });
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    cargarDatos(controller.signal);
    return () => controller.abort();
  }, [cargarDatos]);

  const subtotal = Number(formulario.subtotal) || 0;
  const iva = subtotal * 0.19;
  const total = subtotal + iva;

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormulario((previo) => ({ ...previo, [name]: value }));
  };

  const cerrarModal = () => {
    setModal(false);
    setEditando(null);
    setFormulario(FORMULARIO_INICIAL);
  };

  const abrirModal = () => {
    setEditando(null);
    setFormulario({ ...FORMULARIO_INICIAL, fecha: new Date().toISOString().split('T')[0] });
    setModal(true);
  };

  const guardar = async (e) => {
    e.preventDefault();
    if (!formulario.proveedor.trim() || !formulario.numeroFactura.trim()) {
      alertDark.fire({ icon: 'warning', title: 'Campos incompletos', text: 'Ingresa el proveedor y el número de factura.' });
      return;
    }

    const esEdicion = Boolean(editando);
    const url = esEdicion ? `${API}/${editando.id}` : API;
    const payload = {
      proveedor: formulario.proveedor.trim(),
      numeroFactura: formulario.numeroFactura.trim(),
      fecha: formulario.fecha,
      subtotal,
      iva: Number(iva.toFixed(2)),
      total: Number(total.toFixed(2)),
      formaPago: formulario.formaPago,
      estado: formulario.estado
    };

    try {
      const respuesta = await fetch(url, {
        method: esEdicion ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!respuesta.ok) throw new Error('Error al procesar la solicitud');
      await cargarDatos();
      cerrarModal();
    } catch (error) {
      console.error(error);
      alertDark.fire({ icon: 'error', title: 'Error', text: 'No se pudo guardar la factura.' });
    }
  };

  const editar = (factura) => {
    setEditando(factura);
    setFormulario({
      proveedor: factura.proveedor || '',
      numeroFactura: factura.numeroFactura || '',
      fecha: factura.fecha || '',
      subtotal: factura.subtotal || '',
      formaPago: factura.formaPago || 'Transferencia',
      estado: factura.estado || 'Pendiente'
    });
    setModal(true);
  };

  const eliminar = async (id) => {
    const confirmacion = await alertDark.fire({
      title: '¿Deseas eliminar esta factura?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });
    if (!confirmacion.isConfirmed) return;

    try {
      const respuesta = await fetch(`${API}/${id}`, { method: 'DELETE' });
      if (!respuesta.ok) throw new Error('Error al eliminar');
      await cargarDatos();
    } catch (error) {
      console.error(error);
      alertDark.fire({ icon: 'error', title: 'Error', text: 'No se pudo eliminar la factura.' });
    }
  };

  const filtradas = facturas.filter((factura) => {
    const termino = buscar.toLowerCase();
    return [factura.id, factura.proveedor, factura.numeroFactura, factura.fecha, factura.estado]
      .some((valor) => String(valor || '').toLowerCase().includes(termino));
  });
  const pendientes = facturas.filter((factura) => factura.estado === 'Pendiente').length;
  const pagadas = facturas.filter((factura) => factura.estado === 'Pagada').length;
  const totalFacturado = facturas.reduce((acumulado, factura) => acumulado + Number(factura.total || 0), 0);

  return (
    <>
      <NavbarJefe />
      <div className="page-facturas">
        <div className="container-fluid py-4">
          <div className="cuadros mb-4"><div className="encabezado shadow p-3"><h2>Gestión de Facturas</h2><h5>Registro y control de facturas de proveedores</h5></div></div>
          <div className="contenedor-cards row g-3 mb-4">
            <div className="col-md-3"><div className="card p-3"><span>Total facturas</span><h2>{facturas.length}</h2></div></div>
            <div className="col-md-3"><div className="card p-3"><span>Pagadas</span><h2 className="text-success">{pagadas}</h2></div></div>
            <div className="col-md-3"><div className="card p-3"><span>Pendientes</span><h2 className="text-warning">{pendientes}</h2></div></div>
            <div className="col-md-3"><div className="card p-3"><span>Total</span><h2 className="text-info">${totalFacturado.toLocaleString('es-CO')}</h2></div></div>
          </div>

          <div className="tabla-contenedor"><div className="card shadow p-3">
            <div className="card-header bg-transparent border-0 d-flex justify-content-between align-items-center px-0 mb-3">
              <h3 className="mb-0 text-white">Listado de Facturas</h3>
              <button type="button" className="btn btn-registrar" onClick={abrirModal}><i className="fa-solid fa-plus me-1"></i> Registrar Factura</button>
            </div>
            <input type="text" className="form-control input-dark mb-3" placeholder="Buscar factura..." value={buscar} onChange={(e) => setBuscar(e.target.value)} />
            <div className="table-responsive"><table className="table table-hover align-middle">
              <thead><tr><th>ID</th><th>Proveedor</th><th>N° Factura</th><th>Fecha</th><th>Total</th><th>Estado</th><th>Acciones</th></tr></thead>
              <tbody>{filtradas.length === 0 ? <tr><td colSpan="7" className="text-center py-4 text-muted">No se encontraron facturas registradas.</td></tr> : filtradas.map((factura) => (
                <tr key={factura.id}><td>{factura.id}</td><td>{factura.proveedor}</td><td>{factura.numeroFactura}</td><td>{factura.fecha}</td><td>${Number(factura.total || 0).toLocaleString('es-CO')}</td><td>{factura.estado}</td><td>
                  <button type="button" className="btn btn-warning btn-sm me-2" onClick={() => editar(factura)}><i className="fa-solid fa-pen"></i></button>
                  <button type="button" className="btn btn-danger btn-sm" onClick={() => eliminar(factura.id)}><i className="fa-solid fa-trash"></i></button>
                </td></tr>
              ))}</tbody>
            </table></div>
          </div></div>

          {modal && <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}><div className="modal-dialog modal-dialog-centered"><div className="modal-content text-bg-dark border-secondary">
            <div className="modal-header"><h5 className="modal-title">{editando ? 'Editar Factura' : 'Registrar Factura'}</h5><button type="button" className="btn-close btn-close-white" onClick={cerrarModal}></button></div>
            <form onSubmit={guardar}><div className="modal-body">
              <label className="form-label">Proveedor</label><input type="text" name="proveedor" className="form-control input-dark mb-3" value={formulario.proveedor} onChange={manejarCambio} required />
              <label className="form-label">Número de factura</label><input type="text" name="numeroFactura" className="form-control input-dark mb-3" value={formulario.numeroFactura} onChange={manejarCambio} required />
              <label className="form-label">Fecha</label><input type="date" name="fecha" className="form-control input-dark mb-3" value={formulario.fecha} onChange={manejarCambio} required />
              <label className="form-label">Subtotal</label><input type="number" name="subtotal" min="0" className="form-control input-dark mb-3" value={formulario.subtotal} onChange={manejarCambio} required />
              <label className="form-label">Forma de pago</label><select name="formaPago" className="form-select input-dark mb-3" value={formulario.formaPago} onChange={manejarCambio}><option value="Efectivo">Efectivo</option><option value="Transferencia">Transferencia</option><option value="Tarjeta">Tarjeta</option><option value="Crédito">Crédito</option></select>
              <label className="form-label">Estado</label><select name="estado" className="form-select input-dark" value={formulario.estado} onChange={manejarCambio}><option value="Pendiente">Pendiente</option><option value="Pagada">Pagada</option><option value="Anulada">Anulada</option></select>
            </div><div className="modal-footer"><button type="button" className="btn btn-secondary" onClick={cerrarModal}>Cancelar</button><button type="submit" className="btn btn-registrar">Guardar</button></div></form>
          </div></div></div>}
        </div>
      </div>
    </>
  );
}

export default Pro_Facturas;
