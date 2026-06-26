let tabla;

$(document).ready(function () {

    tabla = $("#tablaProveedores").DataTable({
        language: {
            search: "Buscar",
            lengthMenu: "Mostrar _MENU_ Registro",
            info: "Mostrar _START_ a _END_ de _TOTAL_ registros",
            infoEmpty: "Mostrando 0 a 0 de 0 registros",
            zeroRecords: "No se encontraron resultados",
            emptyTable: "No hay datos disponibles en la tabla",
            paginate: {
                first: "Primero",
                last: "Último",
                next: "Siguiente",
                previous: "Anterior"
            }
        }
    });

    actualizarContadores();
});

function actualizarContadores() {

    const filas = document.querySelectorAll("#tablaProveedores tbody tr");

    let total = filas.length;
    let activos = 0;
    let revision = 0;

    filas.forEach(fila => {

        const estado = fila.cells[5].textContent.trim();

        if (estado === "Activo") activos++;

        if (estado === "Pendiente") revision++;

    });

    document.getElementById("totalproveedores").textContent = total;
    document.getElementById("Activos").textContent = activos;
    document.getElementById("revicion").textContent = revision;
}

let contador = 6;

document.getElementById("guardarProveedor").addEventListener("click", () => {

    const proveedor = document.getElementById("proveedor").value;
    const telefono = document.getElementById("telefono").value;
    const correo = document.getElementById("correo").value;
    const ciudad = document.getElementById("ciudad").value;
    const estado = document.getElementById("estado").value;

    let badge = "";

    if (estado === "Activo") {
        badge = '<span class="badge bg-success">Activo</span>';
    } else if (estado === "Inactivo") {
        badge = '<span class="badge bg-danger">Inactivo</span>';
    } else {
        badge = '<span class="badge bg-warning text-dark">Pendiente</span>';
    }

    tabla.row.add([
        String(contador).padStart(3, "0"),
        proveedor,
        telefono,
        correo,
        ciudad,
        badge,
        `
        <button class="btn btn-sm btn-editar">
            <i class="fa-solid fa-pen"></i>
        </button>

        <button class="btn btn-sm btn-eliminar">
            <i class="fa-solid fa-trash"></i>
        </button>
        `
    ]).draw(false);

    contador++;

    actualizarContadores();

    bootstrap.Modal.getInstance(
        document.getElementById("modalProveedor")
    ).hide();

});