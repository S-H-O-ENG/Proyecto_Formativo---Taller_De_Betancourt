import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logoImg from '../assets/logo.png';
import supraImg from '../assets/supra.png';
import '../css/Clientes.css';

const API_CLIENTES = "http://localhost:3000/clientes";
const API_VEHICULOS = "http://localhost:3000/vehiculos";

const EstadoInicialForm = {
    id: null,
    cedula: '',
    nombre: '',
    apellido: '',
    telefono: '',
    correo: '',
    tipoVehiculo: '',
    placa: '',
    marca: '',
    modelo: '',
    color: ''
};

function GestionClientes({ alSalir }) {
    const [clientes, setClientes] = useState([]);
    const [vehiculos, setVehiculos] = useState([]);
    const [formData, setFormData] = useState(EstadoInicialForm);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [clienteExistenteBloqueado, setClienteExistenteBloqueado] = useState(null);

    // Cargar clientes y vehículos desde db.json
    const obtenerDatos = async () => {
        try {
            const respClientes = await axios.get(API_CLIENTES);
            setClientes(respClientes.data);

            const respVehiculos = await axios.get(API_VEHICULOS);
            setVehiculos(respVehiculos.data);
        } catch (error) {
            console.error("Error al cargar los datos desde db.json:", error);
        }
    };

    useEffect(() => {
        obtenerDatos();
    }, []);

    const handleChange = (e) => {
        const { id, value } = e.target;
        
        // Al escribir la cédula en un nuevo registro, validamos si ya existe el cliente
        if (id === 'cedula' && formData.id === null) {
            setFormData(prev => ({ ...prev, [id]: value }));
            
            if (value.trim() !== '') {
                const encontrado = clientes.find(c => c.cedula === value);

                if (encontrado) {
                    // Si el cliente ya existe, rellenamos sus datos, bloqueamos campos y guardamos referencia
                    setFormData(prev => ({
                        ...prev,
                        nombre: encontrado.nombre,
                        apellido: encontrado.apellido,
                        telefono: encontrado.telefono,
                        correo: encontrado.correo
                    }));
                    setClienteExistenteBloqueado(encontrado);
                } else {
                    setClienteExistenteBloqueado(null);
                }
            } else {
                setClienteExistenteBloqueado(null);
            }
        } else {
            setFormData(prev => ({ ...prev, [id]: value }));
        }
    };

    const abrirNuevoRegistro = () => {
        setFormData(EstadoInicialForm);
        setClienteExistenteBloqueado(null);
        setMostrarModal(true);
    };

    const abrirEdicion = (cliente, vehiculoAsociado) => {
        setFormData({
            id: cliente.id,
            cedula: cliente.cedula || '',
            nombre: cliente.nombre || '',
            apellido: cliente.apellido || '',
            telefono: cliente.telefono || '',
            correo: cliente.correo || '',
            tipoVehiculo: vehiculoAsociado ? vehiculoAsociado.tipoVehiculo : '',
            placa: vehiculoAsociado ? vehiculoAsociado.placa : '',
            marca: vehiculoAsociado ? vehiculoAsociado.marca : '',
            modelo: vehiculoAsociado ? vehiculoAsociado.modelo : '',
            color: vehiculoAsociado ? vehiculoAsociado.color : '',
            vehiculoId: vehiculoAsociado ? vehiculoAsociado.id : null
        });
        setClienteExistenteBloqueado(null);
        setMostrarModal(true);
    };

    const cerrarModal = () => {
        setMostrarModal(false);
        setClienteExistenteBloqueado(null);
        setFormData(EstadoInicialForm);
    };

    const guardarCliente = async (e) => {
        e.preventDefault();

        try {
            // Validar si la placa ya existe en los vehículos
            const existePlaca = vehiculos.some(
                v => v.placa && formData.placa && v.placa.toLowerCase() === formData.placa.toLowerCase() && v.id !== formData.vehiculoId
            );

            if (existePlaca) {
                alert("Atención: Ya existe un vehículo registrado con esta Placa.");
                return;
            }

            if (formData.id === null) {
                let clienteId;

                if (clienteExistenteBloqueado) {
                    // El cliente ya existe, usamos su ID existente
                    clienteId = clienteExistenteBloqueado.id;
                } else {
                    // Es un cliente nuevo: lo guardamos en la tabla 'clientes'
                    const nuevoCliente = {
                        cedula: formData.cedula,
                        nombre: formData.nombre,
                        apellido: formData.apellido,
                        telefono: formData.telefono,
                        correo: formData.correo
                    };
                    const respuestaCliente = await axios.post(API_CLIENTES, nuevoCliente);
                    clienteId = respuestaCliente.data.id;
                }

                // Guardamos el vehículo asociado al ID del cliente en la tabla 'vehiculos'
                const nuevoVehiculo = {
                    clienteId: clienteId,
                    tipoVehiculo: formData.tipoVehiculo,
                    placa: formData.placa.toUpperCase(),
                    marca: formData.marca,
                    modelo: formData.modelo,
                    color: formData.color
                };
                await axios.post(API_VEHICULOS, nuevoVehiculo);

            } else {
                // Actualizar datos del cliente y su vehículo
                const clienteActualizado = {
                    cedula: formData.cedula,
                    nombre: formData.nombre,
                    apellido: formData.apellido,
                    telefono: formData.telefono,
                    correo: formData.correo
                };
                await axios.put(`${API_CLIENTES}/${formData.id}`, clienteActualizado);

                if (formData.vehiculoId) {
                    const vehiculoActualizado = {
                        clienteId: formData.id,
                        tipoVehiculo: formData.tipoVehiculo,
                        placa: formData.placa.toUpperCase(),
                        marca: formData.marca,
                        modelo: formData.modelo,
                        color: formData.color
                    };
                    await axios.put(`${API_VEHICULOS}/${formData.vehiculoId}`, vehiculoActualizado);
                }
            }

            obtenerDatos();
            cerrarModal();
        } catch (error) {
            console.error("Error al guardar en la base de datos:", error);
            alert("Ocurrió un error al procesar el registro.");
        }
    };

    const eliminarRegistro = async (cliente, vehiculo) => {
        if (window.confirm(`¿Deseas eliminar el vehículo con placa ${vehiculo.placa} de ${cliente.nombre}?`)) {
            try {
                // Borramos el vehículo de su tabla
                await axios.delete(`${API_VEHICULOS}/${vehiculo.id}`);
                
                // Opcional: verificar si el cliente se quedó sin vehículos para decidir si eliminarlo también
                const vehiculosRestantes = vehiculos.filter(v => v.clienteId === cliente.id && v.id !== vehiculo.id);
                if (vehiculosRestantes.length === 0) {
                    await axios.delete(`${API_CLIENTES}/${cliente.id}`);
                }

                obtenerDatos();
            } catch (error) {
                console.error("Error al eliminar el registro:", error);
                alert("Ocurrió un error al eliminar.");
            }
        }
    };

    return (
        <div className="dashboard-layout">
            <aside className="sidebar offcanvas">
                <div className="sidebar-logo">
                    <img src={logoImg} alt="Logo Taller" />
                    <div className="sidebar-brand-text">
                        <h2>Taller De Betancourt</h2>
                        <p>Gestión de Clientes</p>
                    </div>
                </div>
                <nav className="sidebar-menu">
                    <a href="#gestion-clientes" className="active">
                        <i className="fa-regular fa-user"></i>
                        <span>Gestion Clientes</span>
                    </a>
                    <a href="#salir" onClick={(e) => { e.preventDefault(); if (alSalir) alSalir(); }}>
                        <i className="fa-solid fa-arrow-right-from-bracket"></i>
                        <span>Salir</span>
                    </a>
                </nav>
            </aside>

            <main className="dashboard-main">
                <header className="topbar">
                    <div>
                        <p>Bienvenido</p>
                    </div>
                    <div className="inventario-info">
                        <i className="fa-regular fa-user"></i>
                        <span>Gestión de Clientes</span>
                    </div>
                </header>

                <div className="contenedor-principal">
                    <div className="header mb-4 d-flex justify-content-between align-items-center">
                        <div>
                            <h2>Gestión y Registro de Clientes</h2>
                        </div>
                        <img src={supraImg} className="carro" alt="Vehículo decorativo" />
                    </div>

                    <section className="panel tabla">
                        <div className="cabecera-tabla d-flex justify-content-between align-items-center mb-3">
                            <div>
                                <h2>Clientes y Vehículos</h2>
                            </div>
                            <button className="btn btn-taller" onClick={abrirNuevoRegistro}>
                                <i className="fa-solid fa-plus"></i> Nuevo Cliente / Vehículo
                            </button>
                        </div>

                        <div className="table-responsive">
                            <table id="tablaUsuarios" className="table align-middle table-dark table-hover">
                                <thead>
                                    <tr>
                                        <th>Cédula</th>
                                        <th>Propietario</th>
                                        <th>Teléfono / Correo</th>
                                        <th>Vehículo</th>
                                        <th>Placa</th>
                                        <th>Detalles Vehículo</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {vehiculos.length === 0 ? (
                                        <tr>
                                            <td colSpan="7" className="text-center text-muted py-4">
                                                No hay vehículos registrados en el sistema.
                                            </td>
                                        </tr>
                                    ) : (
                                        vehiculos.map((vehiculo) => {
                                            const propietario = clientes.find(c => c.id === vehiculo.clienteId) || {};
                                            return (
                                                <tr key={vehiculo.id}>
                                                    <td>
                                                        <span className="badge bg-dark text-white-50 font-monospace">
                                                            {propietario.cedula || 'N/A'}
                                                        </span>
                                                    </td>
                                                    <td>{propietario.nombre} {propietario.apellido}</td>
                                                    <td>
                                                        <div className="small">
                                                            <i className="fa-solid fa-phone text-muted me-1"></i> {propietario.telefono}
                                                        </div>
                                                        <div className="small correo-tabla">
                                                            <i className="fa-solid fa-envelope me-1"></i> {propietario.correo}
                                                        </div>
                                                    </td>
                                                    <td><span className="badge bg-secondary">{vehiculo.tipoVehiculo}</span></td>
                                                    <td>
                                                        <span className="badge bg-warning text-dark font-monospace" style={{ letterSpacing: '1px' }}>
                                                            {vehiculo.placa ? vehiculo.placa.toUpperCase() : ''}
                                                        </span>
                                                    </td>
                                                    <td className="small text-white-50">
                                                        {vehiculo.marca} {vehiculo.modelo} ({vehiculo.color})
                                                    </td>
                                                    <td>
                                                        <button className="btn btn-sm btn-outline-info me-1" onClick={() => abrirEdicion(propietario, vehiculo)}>
                                                            <i className="fa-solid fa-pen"></i>
                                                        </button>
                                                        <button className="btn btn-sm btn-outline-danger" onClick={() => eliminarRegistro(propietario, vehiculo)}>
                                                            <i className="fa-solid fa-trash"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {mostrarModal && (
                        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }} tabIndex="-1">
                            <div className="modal-dialog modal-dialog-centered modal-lg-custom">
                                <div className="modal-content">
                                    <div className="modal-header border-0">
                                        <h2 className="modal-title w-100 text-center">
                                            {formData.id ? "Modificar Registro" : "Nuevo Registro de Cliente / Vehículo"}
                                        </h2>
                                        <button type="button" className="btn-close" onClick={cerrarModal}></button>
                                    </div>

                                    <div className="modal-body">
                                        <form onSubmit={guardarCliente}>
                                            <div className="row">
                                                <div className="col-md-6 mb-3">
                                                    <div className="seccion-titulo-modal">Datos del propietario</div>

                                                    <div className="mb-3">
                                                        <label className="form-label text-white-50">Cédula:</label>
                                                        <input
                                                            type="number"
                                                            id="cedula"
                                                            className="form-control"
                                                            placeholder="Cédula de ciudadanía"
                                                            value={formData.cedula}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                    </div>

                                                    {clienteExistenteBloqueado && (
                                                        <div className="alert alert-info py-2 small mb-3">
                                                            <i className="fa-solid fa-circle-info me-1"></i> 
                                                            Cliente existente detectado. Sus datos seran autocompletados. Solo se registrará el nuevo vehículo.
                                                        </div>
                                                    )}

                                                    <div className="mb-3">
                                                        <label className="form-label text-white-50">Nombre:</label>
                                                        <input 
                                                            type="text" 
                                                            id="nombre" 
                                                            className="form-control" 
                                                            placeholder="Nombres" 
                                                            value={formData.nombre} 
                                                            onChange={handleChange} 
                                                            disabled={clienteExistenteBloqueado !== null}
                                                            required 
                                                        />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label text-white-50">Apellido:</label>
                                                        <input 
                                                            type="text" 
                                                            id="apellido" 
                                                            className="form-control" 
                                                            placeholder="Apellidos" 
                                                            value={formData.apellido} 
                                                            onChange={handleChange} 
                                                            disabled={clienteExistenteBloqueado !== null}
                                                            required 
                                                        />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label text-white-50">Teléfono:</label>
                                                        <input 
                                                            type="tel" 
                                                            id="telefono" 
                                                            className="form-control" 
                                                            placeholder="Número de celular" 
                                                            value={formData.telefono} 
                                                            onChange={handleChange} 
                                                            disabled={clienteExistenteBloqueado !== null}
                                                            required 
                                                        />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label text-white-50">Correo Electrónico:</label>
                                                        <input 
                                                            type="email" 
                                                            id="correo" 
                                                            className="form-control" 
                                                            placeholder="correo@ejemplo.com" 
                                                            value={formData.correo} 
                                                            onChange={handleChange} 
                                                            disabled={clienteExistenteBloqueado !== null}
                                                            required 
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-md-6 mb-3">
                                                    <div className="seccion-titulo-modal">Datos del vehículo</div>

                                                    <div className="mb-3">
                                                        <label className="form-label text-white-50">Tipo de vehículo:</label>
                                                        <select id="tipoVehiculo" className="form-select" value={formData.tipoVehiculo} onChange={handleChange} required>
                                                            <option value="">Seleccione un tipo</option>
                                                            <option value="Automóvil">Automóvil</option>
                                                            <option value="Camioneta">Camioneta</option>
                                                            <option value="Motocicleta">Motocicleta</option>
                                                            <option value="Camión">Camión</option>
                                                        </select>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label text-white-50">Placa:</label>
                                                        <input type="text" id="placa" className="form-control" placeholder="Ej: ABC123" value={formData.placa} onChange={handleChange} required />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label text-white-50">Marca:</label>
                                                        <input type="text" id="marca" className="form-control" placeholder="Ej: Chevrolet" value={formData.marca} onChange={handleChange} required />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label text-white-50">Modelo:</label>
                                                        <input type="text" id="modelo" className="form-control" placeholder="Ej: 2024" value={formData.modelo} onChange={handleChange} required />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label text-white-50">Color:</label>
                                                        <input type="text" id="color" className="form-control" placeholder="Ej: Negro" value={formData.color} onChange={handleChange} required />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row mt-3">
                                                <div className="col-12">
                                                    <button type="submit" className="btn btn-taller w-100 py-2">
                                                        {formData.id ? "Actualizar Cambios" : (clienteExistenteBloqueado ? "Asociar Nuevo Vehículo" : "Guardar Registro")}
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default GestionClientes;