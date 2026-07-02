let tabla;
let contador = 1;
let filaEditar = null;
const bootstrapModal = new bootstrap.Modal(document.getElementById('modalProveedor'));

$(document).ready(function () {
    
    // 1. MANEJO DEL SIDEBAR RESPONSIVE / COLAPSABLE
    $("#btnToggleSidebar").on("click", function() {
        if ($(window).width() > 991.98) {
            // Desktop: Colapsar/Expandir de forma fija
            $("#sidebar").toggleClass("collapsed");
            $("#mainContent").toggleClass("expanded");
        } else {
            // Mobile: Aparecer/Desaparecer lateralmente
            $("#sidebar").toggleClass("show-mobile");
        }
    });

    // Cerrar sidebar al hacer clic afuera en móviles
    $(document).on("click", function(e) {
        if ($(window).width() <= 991.98) {
            if (!$(e.target).closest('#sidebar, #btnToggleSidebar').length) {
                $("#sidebar").removeClass("show-mobile");
            }
        }
    });

    // 2. INICIALIZACIÓN DE DATATABLES RESPONSIVE
    tabla = $("#tablaProveedores").DataTable({
        responsive: true,
        autoWidth: false,
        columnDefs: [
            { className: "text-center align-middle", targets: "_all" },
            { orderable: false, targets: [5, 6] }
        ],
        language: {
            search: "_INPUT_",
            searchPlaceholder: "Buscar proveedor...",
            lengthMenu: "Mostrar _MENU_",
            info: "Mostrando _START_ a _END_ de _TOTAL_",
            infoEmpty: "Sin registros",
            zeroRecords: "No se encontraron resultados matching",
            emptyTable: "No hay proveedores registrados",
            paginate: {
                first: "<i class='fa-solid fa-angles-left'></i>",
                last: "<i class='fa-solid fa-angles-right'></i>",
                next: "<i class='fa-solid fa-angle-right'></i>",
                previous: "<i class='fa-solid fa-angle-left'></i>"
            }
        }
    });

    // 3. PRE-CARGA DE DATOS SEGUROS
    agregarProveedor("Distribuciones Andina SAS", "3104567890", "contacto@andina.com", "Bogotá", "Activo");
    agregarProveedor("Comercial ABC", "3204561234", "ventas@abc.com", "Medellín", "Pendiente");
    actualizarContadores();

    // 4. INVOCAR MODAL PARA REGISTRO NUEVO
    $("#btnNuevoProveedor").on("click", function() {
        filaEditar = null;
        $("#formProveedor")[0].reset();
        $("#estado").val("Activo");
        $("#modalTitle").text("Registrar Proveedor");
        bootstrapModal.show();
    });
});

// --- COMPONENTES UI REUTILIZABLES ---
function crearBadge(estado) {
    if (estado === "Activo") return '<span class="badge bg-success-subtle text-success"><i class="fa-solid fa-circle shadow-sm me-1 small"></i>Activo</span>';
    if (estado === "Pendiente") return '<span class="badge bg-warning-subtle text-warning"><i class="fa-solid fa-spinner fa-spin me-1 small"></i>Pendiente</span>';
    return '<span class="badge bg-danger-subtle text-danger"><i class="fa-solid fa-circle-xmark me-1 small"></i>Inactivo</span>';
}

function botonesAcciones() {
    return `
        <div class="d-flex justify-content-center gap-1">
            <button class="btn btn-warning btn-sm btn-editar" title="Editar Registro">
                <i class="fa-solid fa-pen-to-square text-dark"></i>
            </button>
            <button class="btn btn-danger btn-sm btn-eliminar" title="Eliminar Registro">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        </div>
    `;
}

// --- LOGICA CRUD ---
function agregarProveedor(nombre, telefono, correo, ciudad, estado) {
    tabla.row.add([
        String(contador).padStart(3, "0"),
        nombre,
        telefono,
        correo,
        ciudad,
        crearBadge(estado),
        botonesAcciones()
    ]).draw(false);
    contador++;
}

function actualizarContadores() {
    let total = tabla.rows().count();
    let activos = 0;
    let pendientes = 0;

    tabla.rows().every(function () {
        let datos = this.data();
        let contenedorTemporal = document.createElement("div");
        contenedorTemporal.innerHTML = datos[5];
        let estadoStr = contenedorTemporal.textContent.trim();

        if (estadoStr.includes("Activo")) activos++;
        if (estadoStr.includes("Pendiente")) pendientes++;
    });

    $("#total").text(total);
    $("#activos").text(activos);
    $("#pendientes").text(pendientes);
}

// ACCIÓN ELIMINAR CON SWEETALERT2
$("#tablaProveedores tbody").on("click", ".btn-eliminar", function () {
    let filaDOM = $(this).closest("tr");
    
    Swal.fire({
        title: '¿Eliminar proveedor?',
        text: "Esta acción no se puede revertir de forma directa.",
        icon: 'warning',
        showCancelButton: true,
        background: '#13131c',
        color: '#f1f1f4',
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#242433',
        confirmButtonText: 'Sí, borrar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            tabla.row(filaDOM).remove().draw(false);
            actualizarContadores();
            
            Swal.fire({
                title: 'Eliminado',
                text: 'El proveedor ha sido borrado.',
                icon: 'success',
                background: '#13131c',
                color: '#f1f1f4',
                timer: 1500,
                showConfirmButton: false
            });
        }
    });
});

// ACCIÓN EDITAR
$("#tablaProveedores tbody").on("click", ".btn-editar", function () {
    let filaDOM = $(this).closest("tr");
    filaEditar = tabla.row(filaDOM);
    let datos = filaEditar.data();

    $("#proveedor").val(datos[1]);
    $("#telefono").val(datos[2]);
    $("#correo").val(datos[3]);
    $("#ciudad").val(datos[4]);
    
    let divTemp = document.createElement("div");
    divTemp.innerHTML = datos[5];
    let estadoLimpio = divTemp.textContent.trim();
    $("#estado").val(estadoLimpio);

    $("#modalTitle").text("Modificar Proveedor");
    bootstrapModal.show();
});

// VALIDACIONES Y PROCESO DE GUARDAR
$("#guardarProveedor").on("click", function () {
    let proveedor = $("#proveedor").val().trim();
    let telefono = $("#telefono").val().trim();
    let correo = $("#correo").val().trim();
    let ciudad = $("#ciudad").val().trim();
    let estado = $("#estado").val();

    // Validar Vacíos
    if (proveedor === "" || telefono === "" || correo === "" || ciudad === "") {
        Swal.fire({
            icon: 'error',
            title: 'Campos Incompletos',
            text: 'Por favor, diligencie toda la información solicitada.',
            background: '#13131c',
            color: '#f1f1f4',
            confirmButtonColor: '#5f1ed7'
        });
        return;
    }

    // RegEx para estructura de Email estándar
    let regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexCorreo.test(correo)) {
        Swal.fire({
            icon: 'error',
            title: 'Correo Inválido',
            text: 'Escriba una estructura de correo legítima (ejemplo@dominio.com).',
            background: '#13131c',
            color: '#f1f1f4',
            confirmButtonColor: '#5f1ed7'
        });
        return;
    }

    let filaNueva = [
        filaEditar ? filaEditar.data()[0] : String(contador).padStart(3, "0"),
        proveedor,
        telefono,
        correo,
        ciudad,
        crearBadge(estado),
        botonesAcciones()
    ];

    if (filaEditar) {
        filaEditar.data(filaNueva).draw(false);
        filaEditar = null;
        Swal.fire({
            icon: 'success',
            title: 'Registro Actualizado',
            text: 'Los cambios fueron guardados exitosamente.',
            background: '#13131c',
            color: '#f1f1f4',
            timer: 1800,
            showConfirmButton: false
        });
    } else {
        tabla.row.add(filaNueva).draw(false);
        contador++;
        Swal.fire({
            icon: 'success',
            title: 'Proveedor Registrado',
            text: 'La empresa se añadió correctamente al sistema.',
            background: '#13131c',
            color: '#f1f1f4',
            timer: 1800,
            showConfirmButton: false
        });
    }

    actualizarContadores();
    bootstrapModal.hide();
});