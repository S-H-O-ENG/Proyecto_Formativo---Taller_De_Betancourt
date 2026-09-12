import { useState } from 'react';
import Swal from 'sweetalert2';
import logoImg from '../assets/logo.png';
import '../css/pedidos.css'; 

export default function Pedidos() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    rol: 'Jefe del taller',
    proveedor: '',
    tipoRepuesto: '',
    cantidad: 50,
    importancia: 'Media',
    metodoPago: '',
  });

  const [listaPedidos, setListaPedidos] = useState(() => {
    const pedidosGuardados = localStorage.getItem('pedidos_taller');
    if (pedidosGuardados) {
      return JSON.parse(pedidosGuardados);
    } else {
      return [];
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.nombre || !formData.apellido || !formData.proveedor || !formData.tipoRepuesto || !formData.metodoPago) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor complete todos los campos del formulario.',
        confirmButtonColor: '#5f1ed7',
      });
      return;
    }

    const nuevoPedido = { ...formData, id: Date.now() };
    const nuevaLista = [...listaPedidos, nuevoPedido];

    setListaPedidos(nuevaLista);
    localStorage.setItem('pedidos_taller', JSON.stringify(nuevaLista));

    Swal.fire({
      icon: 'success',
      title: 'Pedido Registrado',
      text: 'El pedido ha sido guardado exitosamente.',
      confirmButtonColor: '#5f1ed7',
    });

    setFormData({
      nombre: '',
      apellido: '',
      rol: 'Jefe del taller',
      proveedor: '',
      tipoRepuesto: '',
      cantidad: 50,
      importancia: 'Media',
      metodoPago: '',
    });
  };

  const handleEliminar = (id) => {
    const listaFiltrada = listaPedidos.filter((pedido) => pedido.id !== id);
    setListaPedidos(listaFiltrada);
    localStorage.setItem('pedidos_taller', JSON.stringify(listaFiltrada));
  };

  const handleSalir = (e) => {
    e.preventDefault();
    window.location.href = '/';
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar Lateral */}
      <aside className="sidebar offcanvas offcanvas-start show" tabIndex="-1" id="sidebarMenu">
        <div className="sidebar-logo">
          <img src={logoImg} alt="Logo Taller" />
          <h2>Taller De Betancourt</h2>
          <p>Gestión De inventarios</p>
        </div>

        <nav className="sidebar-menu">
          <a href="./Proveedores.jsx">
            <i className="fa-solid fa-truck"></i> Proveedores
          </a>
          <a href="/pages/Gestion_Clientes.html">
            <i className="fa-regular fa-user"></i> Clientes
          </a>
          <a href="/pages/inventario.html">
            <i className="fa-solid fa-clipboard-list"></i> Inventario
          </a>
          <a href="/pages/Asignacio.html">
            <i className="fa-solid fa-clipboard-list"></i> Asignación Servicios
          </a>
          <a href="/" onClick={handleSalir}>
            <i className="fa-solid fa-arrow-right-from-bracket"></i> Salir
          </a>
        </nav>
      </aside>

      {/* Contenido Principal */}
      <div className="container py-4">
        <header className="topbar mb-4">
          <div>
            <p className="m-0 fw-bold">Bienvenido</p>
          </div>
          <div className="inventario-info">
            <i className="fa-regular fa-user me-2"></i>
            <span>Gestión de Pedidos</span>
          </div>
        </header>

        {/* Formulario */}
        <form className="formulario mb-5" onSubmit={handleSubmit}>
          {/* Inputs con texto de placeholder en blanco mediante estilo directo */}
          <div className="input-group mb-3">
            <span className="input-group-text">Nombres y apellidos</span>
            <input
              type="text"
              name="nombre"
              className="form-control input-placeholder-blanco"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={handleChange}
            />
            <input
              type="text"
              name="apellido"
              className="form-control input-placeholder-blanco"
              placeholder="Apellido"
              value={formData.apellido}
              onChange={handleChange}
            />
          </div>

          {/* Selector de Rol corregido a solo Jefe del taller */}
          <div className="rol mb-3">
            <label htmlFor="selectRol" className="form-label">Seleccione su rol en el taller</label>
            <select id="selectRol" name="rol" className="form-select" value={formData.rol} onChange={handleChange}>
              <option value="Jefe del taller">Jefe del taller</option>
            </select>
          </div>

          <div className="proveedor mb-3">
            <label htmlFor="selectProveedor" className="form-label">Seleccione un proveedor</label>
            <select id="selectProveedor" name="proveedor" className="form-select" value={formData.proveedor} onChange={handleChange}>
              <option value="">Seleccione una opción</option>
              <option value="Proveedor 1">Proveedor 1</option>
              <option value="Proveedor 2">Proveedor 2</option>
              <option value="Proveedor 3">Proveedor 3</option>
            </select>
          </div>

          <div className="repuesto mb-3">
            <label htmlFor="selectTipoRepuesto" className="form-label">Tipo de repuesto requerido</label>
            <select id="selectTipoRepuesto" name="tipoRepuesto" className="form-select" value={formData.tipoRepuesto} onChange={handleChange}>
              <option value="">Seleccione el tipo de repuesto</option>
              <option value="Aceite de Motor">Aceite de Motor</option>
              <option value="Rines">Rines</option>
              <option value="Llantas">Llantas</option>
              <option value="Filtros de Aire/Aceite">Filtros de Aire/Aceite</option>
              <option value="Pastillas de Freno">Pastillas de Freno</option>
              <option value="Amortiguadores">Amortiguadores</option>
              <option value="Baterías">Baterías</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="range4" className="form-label">
              Cantidad de repuestos requerida: <strong>{formData.cantidad}</strong>
            </label>
            <input
              type="range"
              name="cantidad"
              className="form-range"
              min="1"
              max="100"
              value={formData.cantidad}
              onChange={handleChange}
              id="range4"
            />
          </div>

          <div className="importancia mb-3">
            <label className="form-label">Seleccione la importancia del pedido</label>
            <br />
            {['Alta', 'Media', 'Baja'].map((nivel) => (
              <div className="form-check form-check-inline" key={nivel}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="importancia"
                  id={nivel}
                  value={nivel}
                  checked={formData.importancia === nivel}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor={nivel}>{nivel}</label>
              </div>
            ))}
          </div>

          <div className="pagom mb-4">
            <label htmlFor="selectPago" className="form-label">Seleccione un método de pago</label>
            <select id="selectPago" name="metodoPago" className="form-select" value={formData.metodoPago} onChange={handleChange}>
              <option value="">Seleccione una opción</option>
              <option value="Transferencia">Transferencia</option>
              <option value="Efectivo">Efectivo</option>
            </select>
          </div>

          <button type="submit" className="btn-enviar w-100">Solicitar Pedido</button>
        </form>

        {/* Tabla de historial */}
        {listaPedidos.length > 0 && (
          <div className="seccion-contenedor p-4 rounded text-white" style={{ backgroundColor: 'rgba(23, 15, 38, 0.95)' }}>
            <h3 className="mb-3">Historial de Pedidos Guardados</h3>
            <div className="table-responsive">
              <table className="table table-dark table-striped align-middle">
                <thead>
                  <tr>
                    <th>Solicitante</th>
                    <th>Proveedor</th>
                    <th>Repuesto</th>
                    <th>Cant.</th>
                    <th>Importancia</th>
                    <th>Pago</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {listaPedidos.map((pedido) => (
                    <tr key={pedido.id}>
                      <td>{pedido.nombre} {pedido.apellido}</td>
                      <td>{pedido.proveedor}</td>
                      <td>{pedido.tipoRepuesto}</td>
                      <td>{pedido.cantidad}</td>
                      <td>
                        <span className={`badge ${pedido.importancia === 'Alta' ? 'bg-danger' : pedido.importancia === 'Media' ? 'bg-warning text-dark' : 'bg-secondary'}`}>
                          {pedido.importancia}
                        </span>
                      </td>
                      <td>{pedido.metodoPago}</td>
                      <td>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleEliminar(pedido.id)}>
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}