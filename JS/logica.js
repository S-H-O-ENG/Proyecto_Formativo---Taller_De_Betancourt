let pendientes = 0;
let asignados = 0;

function asignarServicio() {

    let servicio = document.getElementById("servicio").value;
    let descripcion = document.getElementById("descripcion").value;
    let trabajador = document.getElementById("trabajador").value;
    let fecha = document.getElementById("fecha").value;

    if (
        servicio === "" ||
        descripcion === "" ||
        trabajador === "" ||
        fecha === ""
    ) {
        alert("Complete todos los campos");
        return;
    }

    let tabla = document.getElementById("tablaServicios");

    tabla.innerHTML += `
        <tr>
            <td>${servicio}</td>
            <td>${descripcion}</td>
            <td>${trabajador}</td>
            <td>${fecha}</td>
            <td>
                <select onchange="cambiarEstado(this)">
                    <option>Pendiente</option>
                    <option>Asignado</option>
                    <option>Finalizado</option>
                </select>
            </td>
        </tr>
    `;

    pendientes++;

    actualizarContadores();

    document.getElementById("servicio").value = "";
    document.getElementById("descripcion").value = "";
    document.getElementById("trabajador").value = "";
    document.getElementById("fecha").value = "";
}

function cambiarEstado(select) {

    actualizarContadores();
}

function actualizarContadores() {

    let estados = document.querySelectorAll("#tablaServicios select");

    let pendientes = 0;
    let asignados = 0;
    let finalizados = 0;

    estados.forEach(estado => {

        if (estado.value === "Pendiente") {
            pendientes++;
        }

        if (estado.value === "Asignado") {
            asignados++;
        }

        if (estado.value === "Finalizado") {
            finalizados++;
        }

    });

    document.getElementById("pendientes").textContent = pendientes;
    document.getElementById("asignados").textContent = asignados;
    document.getElementById("finalizados").textContent = finalizados;
}
