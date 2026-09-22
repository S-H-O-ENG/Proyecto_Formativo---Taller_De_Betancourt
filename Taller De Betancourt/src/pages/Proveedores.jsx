import { useState, useEffect, useCallback } from 'react';
import Swal from 'sweetalert2';
import NavbarJefe from '../components/NavbarJefe';
import '../css/proveedores.css';

const API_URL = "http://localhost:3000/Proveedores";

const FORM_INICIAL = {
    proveedor: "",
    telefono: "",
    correo: "",
    ciudad: "",
    estado: "Activo"
};

function Proveedores() {
    const [proveedores, setProveedores] = useState([]);
    const [formData, setFormData] = useState(FORM_INICIAL);
    const [editandoId, setEditandoId] = useState(null);
    const [mostrarModal, setMostrarModal] = useState(false);

    // Cargar proveedores desde la API
    const cargarProveedores = useCallback(async (signal) => {
        try {
            const respuesta = await fetch(API_URL, { signal });
            if (!respuesta.ok) throw new Error("Error al obtener los datos");

            const datos = await respuesta.json();
            setProveedores(datos);
        } catch (error) {
            if (error.name !== 'AbortError') {
                Swal.fire("Error", "No se pudo conectar con la base de datos", "error");
            }
        }
    }, []);

    useEffect(() => {
        const controller = new AbortController();
        cargarProveedores(controller.signal);
        return () => controller.abort();
    }, [cargarProveedores]);

    // Manejador centralizado para cambios en inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const limpiarFormulario = () => {
        setFormData(FORM_INICIAL);
        setEditandoId(null);
        setMostrarModal(false);
    };

    const abrirModalNuevo = () => {
        limpiarFormulario();
        setMostrarModal(true);
    };

    const abrirModalEditar = (p) => {
        setEditandoId(p.id);
        setFormData({
            proveedor: p.proveedor,
            telefono: p.telefono,
            correo: p.correo,
            ciudad: p.ciudad,
            estado: p.estado
        });
        setMostrarModal(true);
    };

    const guardarProveedor = async (e) => {
        e.preventDefault();

        const { proveedor, telefono, correo, ciudad } = formData;
        if (!proveedor.trim() || !telefono.trim() || !correo.trim() || !ciudad.trim()) {
            Swal.fire("Campos incompletos", "Debe completar todos los campos", "warning");
            return;
        }

        try {
            const esEdicion = Boolean(editandoId);
            const url = esEdicion ? `${API_URL}/${editandoId}` : API_URL;
            const metodo = esEdicion ? "PUT" : "POST";

            const respuesta = await fetch(url, {
                method: metodo,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (!respuesta.ok) throw new Error();

            Swal.fire(
                esEdicion ? "Actualizado" : "Registrado",
                `Proveedor ${esEdicion ? "actualizado" : "registrado"} correctamente`,
                "success"
            );

            limpiarFormulario();
            cargarProveedores();
        } catch {
            Swal.fire("Error", "No se pudo guardar la información", "error");
        }
    };

    const eliminarProveedor = async (id) => {
        const confirmacion = await Swal.fire({
            title: "¿Eliminar proveedor?",
            text: "Esta acción no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar"
        });

        if (!confirmacion.isConfirmed) return;

        try {
            const respuesta = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
            if (!respuesta.ok) throw new Error();

            Swal.fire("Eliminado", "Proveedor eliminado correctamente", "success");
            cargarProveedores();
        } catch {
            Swal.fire("Error", "No se pudo eliminar el proveedor", "error");
        }
    };

    // Cálculos derivados del estado
    const activos = proveedores.filter(p => p.estado === "Activo").length;
    const pendientes = proveedores.filter(p => p.estado === "Pendiente").length;

    const getBadgeColor = (estado) => {
        switch (estado) {
            case "Activo": return "badge bg-success";
            case "Pendiente": return "badge bg-warning text-dark";
            default: return "badge bg-danger";
        }
    };

    return (
        <>
        <NavbarJefe />
            <div className="encabezado d-flex align-items-center gap-3 p-3">
                <div>
                    <h2>Gestión de Proveedores</h2>
                    <h5>Registro y validación de proveedores</h5>
                </div>
            </div>

            <div className="busquedar container-fluid px-0">
                <div className="contenedor-cards row g-3 mb-4">
                    <div className="col-md-4">
                        <div className="card p-3">
                            <div className="header d-flex justify-content-between">
                                <span>Total proveedores</span>
                                <i className="fa-solid fa-people-line"></i>
                            </div>
                            <h2 className="mt-2">{proveedores.length}</h2>
                            <p className="mb-0 small">Proveedores Registrados</p>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card p-3">
                            <div className="header d-flex justify-content-between">
                                <span>Activos</span>
                                <i className="fa-solid fa-user-check"></i>
                            </div>
                            <h2 className="mt-2 text-success">{activos}</h2>
                            <p className="mb-0 small">Proveedores Activos</p>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card p-3">
                            <div className="header d-flex justify-content-between">
                                <span>En revisión</span>
                                <i className="fa-solid fa-code-compare"></i>
                            </div>
                            <h2 className="mt-2 text-warning">{pendientes}</h2>
                            <p className="mb-0 small">Pendientes De Aprobación</p>
                        </div>
                    </div>
                </div>

                <div className="tabla-contenedor">
                    <div className="card shadow p-3">
                        <div className="card-header bg-transparent border-0 d-flex justify-content-between align-items-center px-0 mb-3">
                            <h3 className="mb-0 text-white">Listado de Proveedores</h3>
                            <button
                                className="btn btn-registrar"
                                onClick={abrirModalNuevo}
                            >
                                <i className="fa-solid fa-plus"></i> Registrar Proveedor
                            </button>
                        </div>

                        <div className="table-responsive">
                            <table id="tablaProveedores" className="table table-hover nowrap w-100">
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
                                    {proveedores.map((p) => (
                                        <tr key={p.id}>
                                            <td>{p.id}</td>
                                            <td>{p.proveedor}</td>
                                            <td>{p.telefono}</td>
                                            <td>{p.correo}</td>
                                            <td>{p.ciudad}</td>
                                            <td>
                                                <span className={getBadgeColor(p.estado)}>
                                                    {p.estado}
                                                </span>
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-sm btn-warning me-2"
                                                    onClick={() => abrirModalEditar(p)}
                                                >
                                                    <i className="fa-solid fa-pen"></i>
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-danger"
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

            {/* Modal controlado por estado de React */}
            {mostrarModal && (
                <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content text-bg-dark border-secondary">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {editandoId ? "Editar Proveedor" : "Registrar Proveedor"}
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close btn-close-white"
                                    onClick={limpiarFormulario}
                                ></button>
                            </div>

                            <form onSubmit={guardarProveedor}>
                                <div className="modal-body">
                                    <div className="mb-2">
                                        <input
                                            type="text"
                                            name="proveedor"
                                            className="form-control"
                                            placeholder="Proveedor"
                                            value={formData.proveedor}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="mb-2">
                                        <input
                                            type="text"
                                            name="telefono"
                                            className="form-control"
                                            placeholder="Teléfono"
                                            value={formData.telefono}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="mb-2">
                                        <input
                                            type="email"
                                            name="correo"
                                            className="form-control"
                                            placeholder="Correo"
                                            value={formData.correo}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="mb-2">
                                        <input
                                            type="text"
                                            name="ciudad"
                                            className="form-control"
                                            placeholder="Ciudad"
                                            value={formData.ciudad}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="mb-2">
                                        <select
                                            name="estado"
                                            className="form-select"
                                            value={formData.estado}
                                            onChange={handleChange}
                                        >
                                            <option value="Activo">Activo</option>
                                            <option value="Pendiente">Pendiente</option>
                                            <option value="Inactivo">Inactivo</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={limpiarFormulario}
                                    >
                                        Cancelar
                                    </button>
                                    <button type="submit" className="btn btn-registrar">
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