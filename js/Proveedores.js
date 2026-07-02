let tabla;
let contador = 1;
let filaEditar = null;

$(document).ready(function () {


    $("#btnToggleSidebar").on("click", function() {
        $("#sidebar").toggleClass("collapsed");
        $("#mainContent").toggleClass("expanded");
    });


    tabla = $("#tablaProveedores").DataTable({
        responsive: true,
        language: {
            search: "Buscar:",
            lengthMenu: "Mostrar _MENU_ registros",
            info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
            infoEmpty: "Mostrando 0 a 0 de 0 registros",
            zeroRecords: "No se encontraron resultados",
            emptyTable: "No hay proveedores registrados",
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

function crearBadge(estado){
    if(estado==="Activo"){
        return '<span class="badge bg-success">Activo</span>';
    }
    if(estado==="Pendiente" || estado==="En revisión"){
        return '<span class="badge bg-warning text-dark">Pendiente</span>';
    }
    return '<span class="badge bg-danger">Inactivo</span>';
}

function botonesAcciones(){
    return `
        <button class="btn btn-warning btn-sm btn-editar me-1">
            <i class="fa-solid fa-pen"></i>
        </button>
        <button class="btn btn-danger btn-sm btn-eliminar">
            <i class="fa-solid fa-trash"></i>
        </button>
    `;
}

function agregarProveedor(nombre, telefono, correo, ciudad, estado){
    tabla.row.add([
        String(contador).padStart(3,"0"),
        nombre,
        telefono,
        correo,
        ciudad,
        crearBadge(estado),
        botonesAcciones()
    ]).draw(false);
    contador++;
}

function actualizarContadores(){
    let total = tabla.rows().count();
    let activos = 0;
    let pendientes = 0;

    tabla.rows().every(function(){
        let datos = this.data();
        let estado = $("<div>"+datos[5]+"</div>").text().trim();
        if(estado==="Activo") activos++;
        if(estado==="Pendiente" || estado==="En revisión") pendientes++;
    });

    $("#totalproveedores").text(total);
    $("#Activos").text(activos);
    $("#revicion").text(pendientes);
}

$("#tablaProveedores tbody").on("click", ".btn-eliminar", function(){
    let fila = $(this).parents("tr");
    
    Swal.fire({
        title: '¿Desea eliminar este proveedor?',
        text: "Esta acción no se puede deshacer.",
        icon: 'warning',
        showCancelButton: true,
        background: '#0d0d11',
        color: '#fff',
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            tabla.row(fila).remove().draw();
            actualizarContadores();
            Swal.fire({
                title: 'Eliminado',
                icon: 'success',
                background: '#0d0d11',
                color: '#fff',
                showConfirmButton: false,
                timer: 1500
            });
        }
    });
});

$("#tablaProveedores tbody").on("click", ".btn-editar", function(){
    filaEditar = tabla.row($(this).parents("tr"));
    let datos = filaEditar.data();

    $("#proveedor").val(datos[1]);
    $("#telefono").val(datos[2]);
    $("#correo").val(datos[3]);
    $("#ciudad").val(datos[4]);
    $("#estado").val($("<div>"+datos[5]+"</div>").text().trim() === "Pendiente" ? "Pendiente" : $("<div>"+datos[5]+"</div>").text().trim());

    $("#modalTitle").text("Modificar Proveedor");
    new bootstrap.Modal(document.getElementById("modalProveedor")).show();
});

$("#guardarProveedor").on("click", function(){
    let proveedor = $("#proveedor").val().trim();
    let telefono = $("#telefono").val().trim();
    let correo = $("#correo").val().trim();
    let ciudad = $("#ciudad").val().trim();
    let estado = $("#estado").val();

    if(proveedor==="" || telefono==="" || correo==="" || ciudad===""){
        Swal.fire({
            icon: 'error',
            title: 'Campos vacíos',
            text: 'Por favor complete todos los campos.',
            background: '#0d0d11',
            color: '#fff',
            confirmButtonColor: '#5f1ed7'
        });
        return;
    }

    let fila = [
        filaEditar ? filaEditar.data()[0] : String(contador).padStart(3,"0"),
        proveedor,
        telefono,
        correo,
        ciudad,
        crearBadge(estado),
        botonesAcciones()
    ];

    if(filaEditar){
        filaEditar.data(fila).draw(false);
        filaEditar = null;
    } else {
        tabla.row.add(fila).draw(false);
        contador++;
    }

    actualizarContadores();
    $("#formProveedor")[0].reset();
    bootstrap.Modal.getInstance(document.getElementById("modalProveedor")).hide();
});