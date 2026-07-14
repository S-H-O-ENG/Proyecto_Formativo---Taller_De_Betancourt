
const clientesPredefinidos = [
    { cedula: "1001", nombre: "Miguel", apellido: "Segura", telefono: "3124567890", correo: "miguelseg@gmail.com", tipoVehiculo: "Automóvil", placa: "MIG001", marca: "Mazda", modelo: "3", color: "Rojo" },
    { cedula: "1002", nombre: "David", apellido: "Camacho", telefono: "3109876543", correo: "chamavid@gmail.com", tipoVehiculo: "Camioneta", placa: "DVC102", marca: "Toyota", modelo: "Hilux", color: "Gris" },
    { cedula: "1003", nombre: "Sebastian", apellido: "Herrera", telefono: "3154445566", correo: "Sebasherrera@gmail.com", tipoVehiculo: "Motocicleta", placa: "SEB103", marca: "Suzuki", modelo: "GSX-S 150", color: "Azul" },
    { cedula: "1004", nombre: "Ronaldinho", apellido: "Gaucho", telefono: "3201010101", correo: "rhn10@gmail.com", tipoVehiculo: "Automóvil", placa: "R10GAU", marca: "Porsche", modelo: "911", color: "Negro" }
];

let bootstrapModal;

document.addEventListener("DOMContentLoaded", () => {
    bootstrapModal = new bootstrap.Modal(document.getElementById('modalUsuario'));
    
    if (!localStorage.getItem("db_clientes")) {
        localStorage.setItem("db_clientes", JSON.stringify(clientesPredefinidos));
    }

    renderizarTabla();

    document.getElementById("formUsuario").addEventListener("submit", guardarCliente);
});

function renderizarTabla() {
    const tabla = document.getElementById("cuerpoTablaClientes");
    const listaClientes = JSON.parse(localStorage.getItem("db_clientes")) || [];
    
    tabla.innerHTML = "";

    if (listaClientes.length === 0) {
        tabla.innerHTML = `<tr><td colspan="7" class="text-center text-muted py-4">No hay clientes registrados en el sistema.</td></tr>`;
        return;
    }

    listaClientes.forEach((cliente, index) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td><strong>${cliente.cedula}</strong></td>
            <td>${cliente.nombre} ${cliente.apellido}</td>
            <td>
                <div class="small"><i class="fa-solid fa-phone text-muted me-1"></i> ${cliente.telefono}</div>
                <div class="small correo-tabla"><i class="fa-solid fa-envelope me-1"></i> ${cliente.correo}</div>
            </td>
            <td><span class="badge bg-secondary">${cliente.tipoVehiculo}</span></td>
            <td><span class="badge bg-warning text-dark font-monospace" style="letter-spacing: 1px;">${cliente.placa.toUpperCase()}</span></td>
            <td class="small text-white-50">${cliente.marca} ${cliente.modelo} (${cliente.color})</td>
            <td>
                <button class="btn btn-sm btn-outline-info me-1" onclick="prepararEdicion(${index})">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger" onclick="eliminarCliente(${index})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        `;
        tabla.appendChild(fila);
    });
}

function prepararNuevoRegistro() {
    document.getElementById("formUsuario").reset();
    document.getElementById("editIndex").value = "";
    document.getElementById("modalTitulo").innerText = "Nuevo Registro de Cliente";
    document.getElementById("btnGuardar").innerText = "Guardar Registro";
    bootstrapModal.show();
}

function prepararEdicion(index) {
    const listaClientes = JSON.parse(localStorage.getItem("db_clientes")) || [];
    const cliente = listaClientes[index];

    if (!cliente) return;

    document.getElementById("editIndex").value = index;
    document.getElementById("cedula").value = cliente.cedula;
    document.getElementById("nombre").value = cliente.nombre;
    document.getElementById("apellido").value = cliente.apellido;
    document.getElementById("telefono").value = cliente.telefono;
    document.getElementById("correo").value = cliente.correo;
    document.getElementById("tipoVehiculo").value = cliente.tipoVehiculo;
    document.getElementById("placa").value = cliente.placa;
    document.getElementById("marca").value = cliente.marca;
    document.getElementById("modelo").value = cliente.modelo;
    document.getElementById("color").value = cliente.color;

    document.getElementById("modalTitulo").innerText = "Modificar Datos del Cliente";
    document.getElementById("btnGuardar").innerText = "Actualizar Cambios";
    
    bootstrapModal.show();
}

function guardarCliente(event) {
    event.preventDefault();

    const index = document.getElementById("editIndex").value;
    let listaClientes = JSON.parse(localStorage.getItem("db_clientes")) || [];

    const datosCliente = {
        cedula: document.getElementById("cedula").value,
        nombre: document.getElementById("nombre").value,
        apellido: document.getElementById("apellido").value,
        telefono: document.getElementById("telefono").value,
        correo: document.getElementById("correo").value,
        tipoVehiculo: document.getElementById("tipoVehiculo").value,
        placa: document.getElementById("placa").value,
        marca: document.getElementById("marca").value,
        modelo: document.getElementById("modelo").value,
        color: document.getElementById("color").value
    };

    if (index === "") {
        const existe = listaClientes.some(c => c.cedula === datosCliente.cedula || c.placa.toLowerCase() === datosCliente.placa.toLowerCase());
        if (existe) {
            alert("Atención: Ya existe un registro con esta Identificación o Placa.");
            return;
        }
        listaClientes.push(datosCliente);
    } else {
        listaClientes[parseInt(index)] = datosCliente;
    }

    localStorage.setItem("db_clientes", JSON.stringify(listaClientes));
    bootstrapModal.hide();
    renderizarTabla();
}

function eliminarCliente(index) {
    let listaClientes = JSON.parse(localStorage.getItem("db_clientes")) || [];
    const cliente = listaClientes[index];

    if (confirm(`¿Estás seguro que deseas eliminar el registro de ${cliente.nombre} ${cliente.apellido} y su vehículo con placa ${cliente.placa.toUpperCase()}?`)) {
        listaClientes.splice(index, 1);
        localStorage.setItem("db_clientes", JSON.stringify(listaClientes));
        renderizarTabla();
    }
}